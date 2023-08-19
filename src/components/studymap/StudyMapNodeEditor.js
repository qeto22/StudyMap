import { Button, Divider, FormControl, InputLabel, MenuItem, Paper, Popover, Select, TextField } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";

function StudyMapNodeEditor({ anchorEl, currItem, onClose, existingNode, onNodeDeleteClicked, onNodeUpdated, }) {
    const [label, setLabel] = useState(currItem.label);
    const [selectedConnectNodes, setSelectedConnectNodes] = useState(currItem.connectedNodes || []);
    const [contentType, setContentType] = useState(currItem.contentType || 'course');
    const [content, setContent] = useState(currItem.content || '');

    const saveData = () => {
        currItem.label = label;
        currItem.contentType = contentType;
        currItem.content = content;

        onNodeUpdated(currItem, selectedConnectNodes);
    }

    return (<Popover
        open={Boolean(anchorEl)}
        anchorPosition={{ top: anchorEl.y, left: anchorEl.x + (anchorEl.width / 2) }}
        anchorReference="anchorPosition"
        onClose={onClose}

    >
        <Paper style={{ padding: '15px', fontSize: "15px", width: "250px", display: "flex", flexDirection: "column", gap: "15px" }}>
            <TextField id="outlined-basic" value={label} onChange={(e) => setLabel(e.target.value)} label="Label" variant="outlined" size="small" />
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" size="small">Connected To</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Connected To"
                    size="small"
                    multiple
                    value={selectedConnectNodes || []}
                    onChange={(e) => {
                        setSelectedConnectNodes(e.target.value)
                    }}
                >
                    {existingNode.filter((item) => {
                        return item.data.id !== currItem.id 
                            && !item.data.id.startsWith('edge')
                            && item.data.label !== null 
                            && item.data.label !== ''
                    }).map((item) => (
                        <MenuItem value={item.data.id}>{item.data.label}</MenuItem>

                    ))}
                </Select>

            </FormControl>
            <Divider style={{
                margin: "5px 0"
            }} />
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" size="small">Content Type</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Content Type"
                    size="small"
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value)}
                >
                    <MenuItem value={'course'}>Course Id</MenuItem>
                    <MenuItem value={'text'}>Plain Text</MenuItem>
                </Select>
            </FormControl>
            <TextField id="outlined-basic" label="Content" variant="outlined" size="small" value={content} onChange={(e) => setContent(e.target.value)} />
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <Button color="success" variant="contained" style={{ color: "white" }} onClick={saveData}><SaveIcon />&nbsp;Save</Button>
                <Button color="material" variant="contained" onClick={onNodeDeleteClicked}><DeleteIcon />&nbsp;Delete</Button>
            </div>
        </Paper>
    </Popover>);
}

export default StudyMapNodeEditor;