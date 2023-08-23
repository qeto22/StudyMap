import { Grid } from "@mui/material";
import ContentItem from "../welcome/ContentItem";
import AddGridItem from "./AddGridItem";
import { useNavigate } from "react-router-dom";

function CourseGrid() {
    const navigate = useNavigate();

    return (
        <Grid container>
            <Grid item md={4} style={{ padding: "0 10px" }}>
                <ContentItem id={'1'}
                    type={'Course'}
                    title={'Test Course Title'}
                    imageSrc={"https://play-lh.googleusercontent.com/1-hPxafOxdYpYZEOKzNIkSP43HXCNftVJVttoo4ucl7rsMASXW3Xr6GlXURCubE1tA=w3840-h2160-rw"}
                    authorName={'Ketevan Bachalashvili'}></ContentItem>
            </Grid>
            <Grid item md={4} style={{ padding: "0 10px" }}>
                <AddGridItem label={'Upload New Course'} onClick={() => navigate('/course/create')} />
            </Grid>
        </Grid>
    )
}

export default CourseGrid;