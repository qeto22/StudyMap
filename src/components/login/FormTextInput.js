import { TextField } from "@mui/material";

function FormTextInput({ label, style }) {
    return (<div style={style}>
        <label className="form-label">{label}</label>
        <TextField
            size="small"
            style={{
                width: "100%",
                marginTop: "7px"
            }}
            sx={{
                "& .MuiInputBase-input": {
                    color: "white",
                    fontSize: "14px",
                    backgroundColor: "rgb(18, 24, 27)"
                },
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "grey",
                    border: "1px solid rgba(255, 255, 255, 0.3)"
                },
                "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "grey",
                    border: "1px solid rgba(255, 255, 255, 0.3)"
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#2f81f7",
                    borderWidth: "2px",
                },
            }}
            variant="outlined"
        />
    </div>)
}

export default FormTextInput;