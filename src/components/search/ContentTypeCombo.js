import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ContentTypeCombo() {
  const [contentType, setContentType] = React.useState('');

  const handleChange = (event) => {
    setContentType(event.target.value);
  };

  return (
    <Box sx={{ marginBottom: "25px"}}>
      <FormControl fullWidth>
        <InputLabel id="content-type">Content Type</InputLabel>
        <Select
          labelId="content-type"
          id="content-type-select"
          value={contentType}
          label="Content Type"
          onChange={handleChange}
          size="medium"
          IconComponent={ExpandMoreIcon}
        >
          <MenuItem value={"STUDY_MAP"}>Study Map</MenuItem>
          <MenuItem value={"COURSE"}>Course</MenuItem>
          
        </Select>
        
      </FormControl>
    </Box>
  );
}