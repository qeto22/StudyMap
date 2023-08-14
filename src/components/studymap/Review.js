import { Grid, Rating, Typography } from "@mui/material";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

function Review(props) {
    return (
        <div style={{ backgroundColor: 'primary',  padding: '15px', borderBottom: '0.1px solid rgb(244 136 120)', marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <img
                    alt="kitketo"
                    src="https://media.licdn.com/dms/image/C4D03AQEV9v3FiWwyuw/profile-displayphoto-shrink_800_800/0/1635665530246?e=2147483647&v=beta&t=3H--_iRB_mZuKpjExzlFiS_PKRwBnfnUMAJhDpoMa5c"
                    style={{ width: '50px', height: '50px', borderRadius: '50px', marginRight: '10px' }}
                />

                <Typography variant="body1" style={{ fontWeight: "bold" }}>
                    {props.reviewAuthor}
                </Typography>

            </div>
            <Rating style={{ display: 'flex', marginTop: '15px', marginBottom: '20px' }}
                name="simple-controlled"
                size="small"
                precision={0.5}
                value={props.ratingValue}
                readOnly
                color="dark"
            />

            <div style={{ marginTop: '10px', marginBottom: '20px', backgroundColor: "primary" }}>
                <Typography variant="body1" style={{ display: 'flex', }}>{props.reviewText}</Typography>
            </div>

            <div style={{ display: 'flex', alignItems: 'center'}}>
                <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                    <ThumbUpOffAltIcon style={{padding: '3px'}} />
                    <Typography variant="body2">{75}</Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ThumbDownOffAltIcon style={{padding: '3px'}}/>
                    <Typography variant="body2">{4}</Typography>
                </div>
            </div>

        </div>
    );
}

export default Review;
