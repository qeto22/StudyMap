import { Button } from "@mui/material";
import cytoscape from "cytoscape";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import StudyMapNodeEditor from "./StudyMapNodeEditor";

function StudyMapVisualisationCreation({nodeData, setNodeData}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedNode, setSelectedNode] = useState(null);
    const [cyInstance, setCyInstance] = useState(null);
    const [resetBool, setResetBool] = useState(false);

    useEffect(() => {
        const cy = cytoscape({
            container: document.getElementById('cy'),
            elements: nodeData,
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

        setCyInstance(cy);

        cy.on('click', 'node', event => {
            const cyDiv = document.getElementById('cy');
            const cytoscapePosition = cyDiv.getBoundingClientRect();


            const node = event.target;
            const currNodeId = node.data().id;
            for (let i = 0; i < nodeData.length; i++) {
                if (currNodeId === nodeData[i].data.id) {
                    setSelectedNode(node.data());
                    break;
                }
            }

            const renderedPosition = node.renderedPosition();
            const renderedWidth = node.renderedWidth();

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
    }, [resetBool, nodeData]);


    const closePopup = () => {
        setAnchorEl(null);
        setSelectedNode(null);
    };

    const resetPosition = () => {
        setResetBool(!resetBool);
    }

    const onAddNodeClicked = () => {
        const newNode = { data: { id: crypto.randomUUID().toString(), label: '' } }
        setNodeData([...nodeData, newNode]);
        setResetBool(!resetBool);
    }

    const onNodeDeleteClicked = () => {
        const newArray = nodeData.filter(node => !node.data.id.includes(selectedNode.id));
        setNodeData(newArray);
    }

    const onNodeUpdated = (node, targetNodeIds) => {
        let updatedNodeData = nodeData.map(item => {
            if (item.data.id === node.id) {
                item.data.label = node.label;
                item.data.connectedNodes = targetNodeIds;
                item.data.contentType = node.contentType;
                item.data.content = node.content;
            }
            return item;
        });

        updatedNodeData = updatedNodeData.filter(cyNode => {
            return !cyNode.data.id.startsWith(`edge_${node.id}`)
        })

        for (let i = 0; i < targetNodeIds.length; i++) {
            let targetNodeId = targetNodeIds[i];

            updatedNodeData.push({
                data: {
                    id: `edge_${node.id}_${targetNodeId}`,
                    source: node.id,
                    target: targetNodeId
                }
            });

        }

        setNodeData(updatedNodeData);
        closePopup();
        setResetBool(!resetBool);
    }

    return (<div style={{ marginTop: "50px" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <Button onClick={onAddNodeClicked}
                disabled={cyInstance == null}
                sx={{
                    fontFamily: "cubano",
                    letterSpacing: "1px"
                }} variant="outlined" startIcon={<AddIcon></AddIcon>} >Add Node</Button>
            <Button onClick={resetPosition}
                disabled={cyInstance == null}
                sx={{
                    fontFamily: "cubano",
                    letterSpacing: "1px"
                }} variant="outlined" startIcon={<RestartAltIcon></RestartAltIcon>} >Reset Position</Button>
        </div>
        <div id="cy" style={{ width: '100%', height: '600px' }}></div>
        {
            anchorEl && nodeData.length > 1 ? (<StudyMapNodeEditor anchorEl={anchorEl}
                onClose={closePopup}
                currItem={selectedNode}
                existingNode={nodeData}
                onNodeDeleteClicked={onNodeDeleteClicked}
                onNodeUpdated={onNodeUpdated} />) : (<> </>)
                
        }
    </div>)
}

export default StudyMapVisualisationCreation;