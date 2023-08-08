import { FormControlLabel, Radio, RadioGroup, Rating } from "@mui/material";
import "./StartRatingsRadioButtonGroup.css";

function StartRatingsRadioButtonGroup() {
    return (
        <RadioGroup
            name="radio-buttons-group"
        >
            <div className="star-radio-wrapper">
                <FormControlLabel value="5" control={<Radio />} />
                <Rating
                    name="simple-controlled"
                    size="small"
                    precision={0.5}
                    value={5}
                    readOnly
                    color="dark"
                    style={{
                        marginLeft: "-8px"
                    }}
                />
            </div>

            <div className="star-radio-wrapper">
                <FormControlLabel value="4.5" control={<Radio />} />
                <Rating
                    name="simple-controlled"
                    size="small"
                    precision={0.5}
                    value={4.5}
                    readOnly
                    color="dark"
                    style={{
                        marginLeft: "-8px"
                    }}
                />
            </div>

            <div className="star-radio-wrapper">
                <FormControlLabel value="4" control={<Radio />} />
                <Rating
                    name="simple-controlled"
                    size="small"
                    precision={0.5}
                    value={4}
                    readOnly
                    color="dark"
                    style={{
                        marginLeft: "-8px"
                    }}
                />
            </div>

            <div className="star-radio-wrapper">
                <FormControlLabel value="3.5" control={<Radio />} />
                <Rating
                    name="simple-controlled"
                    size="small"
                    precision={0.5}
                    value={3.5}
                    readOnly
                    color="dark"
                    style={{
                        marginLeft: "-8px"
                    }}
                />
            </div>


        </RadioGroup>
    );
}

export default StartRatingsRadioButtonGroup;