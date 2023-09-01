import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider";
import { Button, Divider, Grid, Rating } from "@mui/material";
import FormTextInput from "../login/FormTextInput";

function ReviewInput({ onReviewSubmit, fieldsEnabled }) {
    const { user } = useContext(AuthContext);

    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");

    const onReviewSubmitClicked = () => {
        onReviewSubmit({
            reviewText,
            rating
        });
    }

    return (<Grid container style={{ marginTop: "20px", marginBottom: '15px', paddingBottom: '20px' }}>
        <Grid item xs={1} style={{ display: "flex", marginTop: '30px', justifyContent: "center" }}>
            <img alt="kitketo" src={user != null && user.imageUrl ? 'http://' + window.location.hostname + `:8080/image/${user.imageUrl}` : '/default-icon.png'}
                style={{ width: '50px', height: '50px', borderRadius: '50px' }}>
            </img>
        </Grid>
        <Grid item xs={11}>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <Rating
                    name="Rating"
                    value={rating}
                    onChange={(event, newValue) => {
                        setRating(newValue);
                    }}
                    disabled={!fieldsEnabled}
                />
            </div>
            <FormTextInput style={{
                width: "100%"
            }}
                defaultValue={reviewText}
                onChange={(event) => {
                    setReviewText(event.target.value);
                }}
                enabled={fieldsEnabled}
                multiline={true} />
            <div style={{ width: "100%", display: "flex", justifyContent: "end", marginTop: "8px" }}>
                <Button sx={{
                    fontFamily: "cubano",
                    letterSpacing: "1px",
                }} disabled={!fieldsEnabled} variant="contained" color="material" onClick={onReviewSubmitClicked}>Submit the Review</Button>
            </div>
        </Grid>
        <Grid item xs={12}>
            <Divider style={{ marginTop: "25px" }}></Divider>
        </Grid>
    </Grid>)
}

export default ReviewInput;