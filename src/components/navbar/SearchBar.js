import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar({ width, marginLeft }) {
  return (<TextField
    type="search"
    label="Search"
    // color="warning"
    variant="outlined"
    sx={{
      "& label": {
        color: "white"
      },
      "& .MuiOutlinedInput-root": {
        color: "white",
        "& fieldset": {
          borderColor: "white"
        },
        "&:hover fieldset": {
          borderColor: "white",
        },
        //   "&.Mui-focused fieldset": {
        //     borderColor: "white"
        //   }
      },
      width: width,
      marginLeft: marginLeft
    }}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start" sx={{
          color: "white"
        }}>
          <SearchIcon />
        </InputAdornment>
      ),
    }}
  />)
}

export default SearchBar;