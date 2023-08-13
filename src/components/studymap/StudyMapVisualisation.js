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
            setAnchorEl(event.target);
            console.log(event.target.renderedPosition());
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
                anchorReference="anchorPosition" // Set the reference type to 'anchorPosition'
                anchorPosition={{ top: anchorEl.y, left: anchorEl.x }} // Use the x and y values
                onClose={closePopup}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
                style={{
                    position: 'fixed',
                    left: (anchorEl.renderedPosition().x + 60).toString() + "px",
                    top: anchorEl.renderedPosition().y + 150,
                    backgroundColor: "#121212",
                    color: 'white',
                    width: '300px',
                    height: '150px',
                    border: '1px solid white',
                    borderRadius: '6px'
                }}>
                <Paper style={{ padding: '10px' }}>
                    qeto magari
                </Paper>
            </Popover>) : (<> </>)
        }
    </div>)
}

export default StudyMapVisualisation;