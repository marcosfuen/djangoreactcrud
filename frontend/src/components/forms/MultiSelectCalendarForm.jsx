import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



export default function MyMultipleSelectCalendarForm({label, options, setSelecteValue, selecteValue}) {
  

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    if (value.includes('all')) {
      setSelecteValue(selecteValue.length === options.length ? [] : options )
    } else {
      setSelecteValue(
        typeof value === 'string' ? value.split(',') : value,
      )
    }

    
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: '100%' }}>
        <InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selecteValue}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          <MenuItem value={'all'}>
              <Checkbox 
                  checked={selecteValue.length === options.length}
                  indeterminate={selecteValue.length > 0 && selecteValue.length < options.length} 
              />
              <ListItemText primary={"Select All"} />
          </MenuItem>

          {options.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox checked={selecteValue.includes(option)} />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
