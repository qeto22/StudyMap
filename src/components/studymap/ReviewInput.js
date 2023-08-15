import { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import { Button, Divider, Grid, Rating } from "@mui/material";
import FormTextInput from "../login/FormTextInput";

function ReviewInput() {
    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
        return (<></>);
    }
    return (<Grid container style={{ marginTop: "20px", marginBottom: '15px', paddingBottom: '20px' }}>
        <Grid item xs={1} style={{ display: "flex", marginTop: '30px', justifyContent: "center" }}>
            <img alt="kitketo" src="https://media.licdn.com/dms/image/C4D03AQEV9v3FiWwyuw/profile-displayphoto-shrink_800_800/0/1635665530246?e=2147483647&v=beta&t=3H--_iRB_mZuKpjExzlFiS_PKRwBnfnUMAJhDpoMa5c"
                style={{ width: '50px', height: '50px', borderRadius: '50px' }}>
            </img>
        </Grid>
        <Grid item xs={11}>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <Rating
                    name="Rating"
                />
            </div>
            <FormTextInput style={{
                width: "100%",

            }} multiline={true} />
            <div style={{ width: "100%", display: "flex", justifyContent: "end", marginTop: "8px" }}>
                <Button sx={{
                    fontFamily: "cubano",
                    letterSpacing: "1px",
                }} variant="contained" color="material">Submit the Review</Button>
            </div>
        </Grid>
        <Grid item xs={12}>
            <Divider style={{ marginTop: "25px" }}></Divider>
        </Grid>
    </Grid>)
}

export default ReviewInput;