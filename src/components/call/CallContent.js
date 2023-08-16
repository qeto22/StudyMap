import React, { useState, useEffect, useRef } from 'react';
import Video from 'twilio-video';
import axios from 'axios';
import './CallContent.css';
import { Divider, Typography } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';
import { Button } from '@mui/base'
import CallEndIcon from '@mui/icons-material/CallEnd';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';


function CallContent() {
    const localVideoRef = useRef();
    const remoteVideoRef = useRef();

    const [microphoneMuted, setMicrophoneMuted] = useState(false);
    const [cameraDisabled, setCameraDisabled] = useState(false);
    const [isFullScreen, setFullScreen] = useState(false);

    const localVideoTrackRef = useRef();
    const localAudioTrackRef = useRef();

    const [roomDuration, setRoomDuration] = useState(0);

    let timerInterval = null;

    const attachTrack = (track) => {
        if (track && track.kind === 'video') {
            track.on('disabled', detachTrack);
            track.on('enabled', attachTrack);
            remoteVideoRef.current.appendChild(track.attach());
        }
    };

    const detachTrack = (track) => {
        if (track) {
            track.detach().forEach(element => {
                element.remove();
            });
        }
    };

    const attachParticipantTracks = (participant) => {
        participant.tracks.forEach(publication => attachTrack(publication.track));
        participant.on('trackSubscribed', handleTrackSubscribed);
        participant.on('trackUnsubscribed', handleTrackUnsubscribed);
    };

    const detachParticipantTracks = (participant) => {
        participant.tracks.forEach(publication => detachTrack(publication.track));
    };

    const handleTrackSubscribed = (track) => {
        attachTrack(track);
    };

    const handleTrackUnsubscribed = (track) => {
        detachTrack(track);
    };

    const startCallTimer = () => {
        timerInterval = setInterval(() => {
            setRoomDuration(prevDuration => prevDuration + 1);
        }, 1000);
    }

    const stopCallTimer = () => {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    }

    const formatDuration = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds - (hours * 3600)) / 60);
        const secs = seconds - (hours * 3600) - (minutes * 60);

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    useEffect(() => {
        let currentRoom = null;
        const jwtToken = localStorage.getItem('token');

        axios.get("http://" + window.location.hostname + ":8080/api/video/token?identity=yourIdentity", {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
            .then(response => {
                const token = response.data.token;
                return Video.createLocalTracks({
                    audio: true,
                    video: true
                }).then(localTracks => {
                    localVideoTrackRef.current = localTracks.find(track => track.kind === 'video');
                    localAudioTrackRef.current = localTracks.find(track => track.kind === 'audio');

                    return Video.connect(token, {
                        name: response.data.roomName,
                        tracks: localTracks
                    });
                })
            })
            .then(room => {
                Video.createLocalVideoTrack().then(track => {
                    localVideoRef.current.appendChild(track.attach());
                });

                currentRoom = room;

                room.on('participantConnected', attachParticipantTracks);
                room.on('participantDisconnected', participant => {
                    detachParticipantTracks(participant);
                    participant.removeListener('trackSubscribed', handleTrackSubscribed);
                    participant.removeListener('trackUnsubscribed', handleTrackUnsubscribed);
                });

                Array.from(room.participants.values()).forEach(attachParticipantTracks);

                startCallTimer();
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
            stopCallTimer();
        };
    }, []);

    useEffect(() => {
        const element = document.documentElement;

        if (isFullScreen) {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
        } else {
            if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }
        }
    }, [isFullScreen]);

    useEffect(() => {
        if (localVideoTrackRef && localVideoTrackRef.current) {
            localVideoTrackRef.current.enable(!cameraDisabled);
        }
    }, [cameraDisabled]);

    useEffect(() => {
        if (localAudioTrackRef && localAudioTrackRef.current) {
            localAudioTrackRef.current.enable(!microphoneMuted);
        }
    }, [microphoneMuted]);

    return (
        <div>
            <div style={{ width: "90vw", height: "90vh", margin: "0 auto" }}>
                <div ref={remoteVideoRef} className='remote-video-wrapper'></div>
                <div ref={localVideoRef} className='local-video-wrapper' style={cameraDisabled ? { display: "none" } : {}}></div>
            </div>
            <Divider />
            <div style={{ height: "9vh", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ marginLeft: "15px" }}>
                    <Typography style={{ fontFamily: "cubano" }}>{formatDuration(roomDuration)}</Typography>
                </div>
                <div style={{ display: "flex", gap: "15px" }}>
                    <Button onClick={() => setMicrophoneMuted(!microphoneMuted)} className={microphoneMuted ? 'action-btn disabled-action-btn' : 'action-btn enabled-action-btn'}>
                        {microphoneMuted ? (<MicOffIcon fontSize='small'></MicOffIcon>) : (<MicIcon fontSize='small'></MicIcon>)}
                    </Button>
                    <Button onClick={() => setCameraDisabled(!cameraDisabled)} className={cameraDisabled ? 'action-btn disabled-action-btn' : 'action-btn enabled-action-btn'}>
                        {cameraDisabled ? (<NoPhotographyIcon fontSize='small'></NoPhotographyIcon>) : (<PhotoCameraIcon fontSize='small'></PhotoCameraIcon>)}
                    </Button>
                    <Button className={'action-btn disabled-action-btn'}>
                        <CallEndIcon fontSize="small"></CallEndIcon>
                    </Button>
                </div>
                <div>
                    <Button onClick={() => setFullScreen(!isFullScreen)} className={'action-btn enabled-action-btn'} style={{ marginRight: "15px" }}>
                        {isFullScreen ? (<FullscreenExitIcon fontSize='small'></FullscreenExitIcon>) : (<FullscreenIcon fontSize="small"></FullscreenIcon>)}
                    </Button>
                </div>
            </div>
        </div >
    );
}

export default CallContent;
