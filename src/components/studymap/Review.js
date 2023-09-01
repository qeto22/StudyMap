import { Divider, Rating, Typography } from "@mui/material";

function Review({rating, reviewText, reviewAuthor}) {
    return (
        <div style={{ backgroundColor: 'primary',  padding: '15px', marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <img
                    alt="kitketo"
                    src={reviewAuthor != null && reviewAuthor.imageUrl ? 'http://' + window.location.hostname + `:8080/image/${reviewAuthor.imageUrl}` : '/default-icon.png'}
                    style={{ width: '50px', height: '50px', borderRadius: '50px', marginRight: '10px' }}
                />

                <Typography variant="body1" style={{ fontWeight: "bold" }}>
                    {reviewAuthor.name}
                </Typography>

            </div>
            <Rating style={{ display: 'flex', marginTop: '15px', marginBottom: '20px' }}
                name="simple-controlled"
                size="small"
                precision={0.5}
                value={rating}
                readOnly
                color="dark"
            />

            <div style={{ marginTop: '10px', marginBottom: '20px', backgroundColor: "primary" }}>
                <Typography variant="body1" style={{ display: 'flex', }}>{reviewText}</Typography>
            </div>

            <div style={{ display: 'flex', alignItems: 'center'}}>
                {/* <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                    <ThumbUpOffAltIcon style={{padding: '3px'}} />
                    <Typography variant="body2">{75}</Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ThumbDownOffAltIcon style={{padding: '3px'}}/>
                    <Typography variant="body2">{4}</Typography>
                </div> */}
            </div>
            <Divider style={{marginTop: "20px"}}></Divider>
        </div>
    );
}

export default Review;
