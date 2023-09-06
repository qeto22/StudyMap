import { Button, Typography } from "@mui/material";
import Person2Icon from '@mui/icons-material/Person2';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { useNavigate } from "react-router-dom";

function Author({ author }) {
    const navigate = useNavigate();

    const onViewProfileClicked = () => {
        navigate(`/author/${author.username}`);
    }

    const onHireMeClicked = () => {
        navigate(`/author/${author.username}?hire-me`);
    }

    return (<div style={{ margin: '50px 0px' }}>
        <Typography variant="h6" style={{ fontWeight: "bold" }}>Author</Typography>
        <div style={{ margin: '20px 0px', display: 'flex', gap: '50px' }}>
            <img alt="mee" src={author != null && author.imageUrl ? 'http://' + window.location.hostname + `:8080/image/${author.imageUrl}` : '/default-icon.png'}
                style={{ width: '150px', height: '150px', borderRadius: '50%' }}></img>
            <div>
                <Typography variant="h5">{ author.name }</Typography>
                <Typography style={{ marginTop: '8px' }}>{ author.description }</Typography>
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