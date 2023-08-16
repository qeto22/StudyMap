import React, { useState, useEffect, useRef } from 'react';
import Video from 'twilio-video';
import axios from 'axios';
import './CallContent.css';

function CallContent() {
    const localVideoRef = useRef();
    const remoteVideoRef = useRef();

    useEffect(() => {
        let currentRoom = null;
        const jwtToken = localStorage.getItem('token');

        axios.get("http://" + window.location.hostname + ":8080/api/video/token?identity=yourIdentity", {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
            .then(response => {
                console.log(response);
                const token = response.data.token;
                return Video.connect(token, {
                    name: response.data.roomName
                });
            })
            .then(room => {
                Video.createLocalVideoTrack().then(track => {
                    localVideoRef.current.appendChild(track.attach());
                });

                currentRoom = room;
                room.on('participantConnected', participant => {

                    participant.on('trackUnsubscribed', track => {
                        if (track.kind === 'video') {
                            track.detach().forEach(element => element.remove());
                        }
                    });
                });

                room.localParticipant.tracks.forEach(publication => {
                    if (publication.track && publication.track.kind === 'video') {
                        remoteVideoRef.current.appendChild(publication.track.attach());
                    }
                });
            });

        const handleWindowClose = () => {
            if (currentRoom) {
                currentRoom.disconnect();
            }
        };

        window.addEventListener('beforeunload', handleWindowClose);

        return () => {
            window.removeEventListener('beforeunload', handleWindowClose);
            if (currentRoom) {
                currentRoom.disconnect();
            }
        };
    }, []);


    return (<div style={{ width: "100vw", height: "100vh" }}>

        <div ref={remoteVideoRef} className='remote-video-wrapper'></div>
        <div ref={localVideoRef} className='local-video-wrapper'></div>

    </div>)
}

export default CallContent;
