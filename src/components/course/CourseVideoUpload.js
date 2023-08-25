import { Delete, ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Button, IconButton, Stack, Typography } from "@mui/material";
import FormTextInput from "../login/FormTextInput";
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import VideoFileIcon from '@mui/icons-material/VideoFile';

function CourseVideoUpload({ addSection, sections, deleteSection, addVideo, deleteVideo, setSectionTitle, setVideoTitle, setVideoFile }) {
    return (<div style={{ marginTop: "25px" }}>
        <div style={{ display: "flex", justifyContent: "right" }}>
            <Button variant="outlined" color="material" style={{ marginLeft: "auto" }} onClick={addSection}>Add a Section</Button>
        </div>
        <Stack spacing={2} style={{ marginTop: "15px" }}>
            {sections.map((item, index) => (
                <Accordion key={index}>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                    >
                        <VideoLibraryIcon size="small" style={{ marginRight: "8px", alignSelf: "center" }} />
                        <Typography style={{ flexGrow: 1, alignSelf: "center", color: item.title === '' ? 'rgba(255, 255, 255, 0.5)' : 'white' }}>{item.title === '' ? 'Please enter section title' : item.title}</Typography>
                        <IconButton
                            color="material"
                            aria-label="delete section"
                            component="span"
                            size="small"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent accordion from expanding/collapsing when deleting
                                deleteSection(index);
                            }}
                        >
                            <Delete />
                        </IconButton>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormTextInput label={"Section Title"} onChange={(e) => setSectionTitle(index, e.target.value)}></FormTextInput>
                        <label style={{ fontSize: "14px", display: "inline-block", marginTop: "15px" }}>Videos</label>
                        <div style={{ display: "flex", justifyContent: "right" }}>
                            <Button variant="outlined" color="success" style={{ marginLeft: "auto" }} size="small" onClick={() => addVideo(index)}>Add a Video</Button>
                        </div>
                        {item.videos.map((video, videoIndex) => (
                            // Todo: make this accordion smaller
                            <Accordion key={`${index}.${videoIndex}`} style={{
                                marginTop: "10px",
                                border: "1px solid rgba(255, 255, 255, 0.3)",
                                borderRadius: "6px"
                            }} size="small" >
                                <AccordionSummary
                                    expandIcon={<ExpandMore />}
                                    style={{ height: "20px" }}
                                >
                                    <VideoFileIcon style={{ marginRight: "8px", alignSelf: "center", fontSize: "17px" }} />
                                    <Typography style={{ flexGrow: 1, alignSelf: "center", fontSize: "14px", color: video.title === '' ? 'rgba(255, 255, 255, 0.5)' : 'white' }}>{video.title === '' ? 'Please enter video title' : video.title}</Typography>
                                    <IconButton
                                        color="material"
                                        aria-label="delete section"
                                        component="span"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteVideo(index, videoIndex);
                                        }}
                                    >
                                        <Delete
                                            style={{ fontSize: "17px" }} />
                                    </IconButton>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <FormTextInput label={"Video Title"}
                                        onChange={(event) => setVideoTitle(index, videoIndex, event.target.value)}></FormTextInput>
                                    <FormTextInput label={"Video File (Supports MP4, AVI, MKV, MOV...)"}
                                        type={'file'}
                                        style={{ marginTop: "10px" }}
                                        onChange={(event) => setVideoFile(index, videoIndex, event.target.files[0])}></FormTextInput>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </AccordionDetails>
                </Accordion>
            ))}
        </Stack>
    </div>)
}

export default CourseVideoUpload;