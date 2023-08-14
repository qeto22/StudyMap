import { Button, Typography } from "@mui/material";
import Person2Icon from '@mui/icons-material/Person2';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { useNavigate } from "react-router-dom";

function Author() {
    const navigate = useNavigate();

    const onViewProfileClicked = () => {
        navigate('/author/ketevan-bachalashvili');
    }

    const onHireMeClicked = () => {
        navigate('/author/ketevan-bachalashvili?hire-me');
    }

    return (<div style={{ margin: '50px 0px' }}>
        <Typography variant="h6" style={{ fontWeight: "bold" }}>Author</Typography>
        <div style={{ margin: '20px 0px', display: 'flex', gap: '50px' }}>
            <img alt="mee" src="https://media.licdn.com/dms/image/C4D03AQEV9v3FiWwyuw/profile-displayphoto-shrink_800_800/0/1635665530246?e=2147483647&v=beta&t=3H--_iRB_mZuKpjExzlFiS_PKRwBnfnUMAJhDpoMa5c"
                style={{ width: '150px', height: '150px', borderRadius: '50%' }}></img>
            <div>
                <Typography variant="h5">Keti Bachalashvili</Typography>
                <Typography style={{ marginTop: '8px' }}>I'm an experienced software engineer, currently working at AzRy as a Java developer. I've been in this industry for over 2 years and I've gained much experience</Typography>
                <Button onClick={onHireMeClicked} startIcon={<HandshakeIcon />} sx={{
                    marginTop: '20px',
                    fontFamily: "cubano",
                    letterSpacing: "1px",
                }} variant="contained" color="material">Hire me</Button>
                <Button onClick={onViewProfileClicked} startIcon={<Person2Icon />}
                    sx={{
                        marginTop: '20px',
                        marginLeft: '8px',
                        fontFamily: "cubano",
                        letterSpacing: "1px"
                    }} variant="outlined" >View Profile</Button>
            </div>
        </div>
    </div>)
}

export default Author;