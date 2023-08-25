import { Autocomplete, Button, InputAdornment, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { debounce } from "lodash";

function SearchBar({ width, marginLeft }) {
  const navigate = useNavigate();

  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');

  const fetchCourses = (query) => {
    axios.get('http://' + window.location.hostname + ':8080/api/v1/marketing/courses', {
      params: {
        query: query
      }
    })
      .then(response => {
        setSearchResults(response.data.courses);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  };

  const debouncedFetchCourses = debounce(fetchCourses, 300);

  useEffect(() => {
    if (query) {
      debouncedFetchCourses(query);
    }

    return () => {
      debouncedFetchCourses.cancel();
    };
  }, [query, debouncedFetchCourses]);

  const onViewMoreResultClicked = () => {
    navigate('/search')
  }

  return (
    <Autocomplete
      options={searchResults}
      getOptionLabel={(option) => option.title}
      noOptionsText="Study Map with given name was not found :'( "
      onInputChange={(event, newValue) => {
        setQuery(newValue);
      }}
      PaperComponent={({ children }) => (
        <div style={{ backgroundColor: "#121212", border: "1px solid white" }}>{children}</div>
      )}
      renderOption={(props, option) => (
        <div>
          <li {...props} onClick={() => navigate(`/courses/${option.id}`)} style={{
            margin: "5px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img src={option.courseIconImageUrl} style={{
                width: "40px",
                height: "40px"
              }} alt="studymap-icon" />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Typography style={{ fontSize: "16px" }}>{option.title}</Typography>
                <Typography style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.9)" }}>By {option.author}</Typography>
              </div>
            </div>
          </li>
          {searchResults.indexOf(option) === searchResults.length - 1 ? (
            <li  {...props} style={{
              margin: "5px"
            }}>
              <Button onClick={onViewMoreResultClicked} sx={{
                        width: "100%",
                        height: "22px",
                        fontFamily: "cubano",
                        letterSpacing: "1px"
                    }} variant="contained" color="material">view more results</Button>
            </li>
          ) : (<></>)}
        </div>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          type="search"
          label="Search"
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
            },
            width: width,
            marginLeft: marginLeft
          }}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <>
                <InputAdornment position="start" sx={{ color: "white" }}>
                  <SearchIcon />
                </InputAdornment>
                {params.InputProps.startAdornment}
              </>
            ),
          }}
        />
      )}
    />
  )
}

export default SearchBar;