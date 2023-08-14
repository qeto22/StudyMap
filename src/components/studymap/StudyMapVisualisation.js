import { Button, Paper, Popover } from "@mui/material";
import cytoscape from "cytoscape";
import { useEffect, useState } from "react";
import LockIcon from '@mui/icons-material/Lock';
import DownloadIcon from '@mui/icons-material/Download';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { LockOpen } from "@mui/icons-material";

function StudyMapVisualisation() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [cyInstance, setCyInstance] = useState(null);
    const [visualisationLocked, setVisualisationLocked] = useState(true);
    const [resetBool, setResetBool] = useState(false);

    useEffect(() => {
        const cy = cytoscape({
            userZoomingEnabled: !visualisationLocked,
            zoomingEnabled: !visualisationLocked,
            userPanningEnabled: !visualisationLocked,
            panningEnabled: !visualisationLocked,
            container: document.getElementById('cy'),
            elements: [
                // Sample nodes
                { data: { id: 'jsRoot', label: 'Javascript', locked: true } },
                { data: { id: 'basics', label: 'Basics' } },
                { data: { id: 'variableTypes', label: 'Variable Types' } },
                { data: { id: 'loops', label: 'Loops' } },
                // Sample edges
                { data: { id: 'basicsEdge', source: 'jsRoot', target: 'basics' } },
                { data: { id: 'variableBasicEdge', source: 'basics', target: 'variableTypes' } },
                { data: { id: 'loopsBasicEdge', source: 'basics', target: 'loops' } },
            ],
            style: [
                {
                    selector: 'node',
                    style: {
                        shape: 'ellipse',
                        width: '20px',
                        height: '20px',
                        label: 'data(label)',
                        color: 'white',
                        backgroundColor: 'white',
                        'font-size': '10px',
                        'text-valign': 'center',
                        'text-halign': 'left',
                        'text-margin-x': '-10px'
                    },
                },
                {
                    selector: 'edge',
                    style: {
                        width: 2,
                        'line-color': 'white',
                        'target-arrow-color': '#ccc',
                        'target-arrow-shape': 'triangle',
                    },
                },
            ],
            layout: {
                name: 'breadthfirst',
                directed: true
            }
        });

        if (visualisationLocked) {
            cy.nodes().lock();
        } else {
            cy.nodes().unlock();
        }

        setCyInstance(cy);

        cy.on('click', 'node', event => {
            const cyDiv = document.getElementById('cy');
            const cytoscapePosition = cyDiv.getBoundingClientRect();
            console.log(cytoscapePosition);


            const node = event.target;
            const renderedPosition = node.renderedPosition();
            const renderedWidth = node.renderedWidth();
            console.log(renderedPosition)

            const newPosX = cytoscapePosition.x + renderedPosition.x + 10;
            const newPosY = cytoscapePosition.y + renderedPosition.y - 15;

            setAnchorEl({
                x: newPosX,
                y: newPosY,
                width: renderedWidth
            });
        });

        return () => {
            cy.destroy();
        };
    }, [resetBool, visualisationLocked]);


    const closePopup = () => {
        setAnchorEl(null);
    };

    const resetPosition = () => {
        setResetBool(!resetBool);
    }

    const lockOrUnlock = () => {
        setVisualisationLocked(!visualisationLocked);
    }

    const download = () => {
        const pngData = cyInstance.png({ scale: 2, full: true });

        const downloadLink = document.createElement('a');
        downloadLink.href = pngData;
        downloadLink.download = 'visualisation.png';
        downloadLink.click();
    }

    return (<div style={{ marginTop: "20px" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <Button onClick={resetPosition}
                disabled={cyInstance == null}
                sx={{
                    fontFamily: "cubano",
                    letterSpacing: "1px"
                }} variant="outlined" startIcon={<RestartAltIcon></RestartAltIcon>} >Reset Position</Button>
            <Button onClick={lockOrUnlock}
                disabled={cyInstance == null}
                sx={{
                    fontFamily: "cubano",
                    letterSpacing: "1px"
                }} variant="outlined" startIcon={visualisationLocked ? <LockOpen /> : <LockIcon />}>{visualisationLocked ? "Unlock Visualisation" : "Lock Visualisation"}</Button>
            <Button onClick={download}
                disabled={cyInstance == null}
                sx={{
                    fontFamily: "cubano",
                    letterSpacing: "1px"
                }} variant="outlined" startIcon={<DownloadIcon></DownloadIcon>} >Download PNG</Button>
        </div>
        <div id="cy" style={{ width: '100%', height: '600px' }}></div>
        {
            anchorEl ? (<Popover
                open={Boolean(anchorEl)}
                anchorPosition={{ top: anchorEl.y, left: anchorEl.x + (anchorEl.width / 2) }}
                anchorReference="anchorPosition"
                onClose={closePopup}
                >
                <Paper style={{ padding: '10px', fontSize: "15px", maxWidth: "225px" }}>
                    Hello, here goes the text, if not link, text will go here!
                </Paper>
            </Popover>) : (<> </>)
        }
    </div>)
}

export default StudyMapVisualisation;