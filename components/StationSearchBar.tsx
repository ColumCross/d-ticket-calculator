import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import stations from '../assets/db-stations.json';

interface StationSearchBarProps {
    value: string | null;
    onChange: (value: string | null) => void;
    label?: string;
    id?: string;
}

export default function StationSearchBar({ value, onChange, label, ...props }: StationSearchBarProps) {

    const options = stations.map((station) => station.name);

    return (
        <Autocomplete 
          freeSolo
          options={options}
          value={value}
          onChange={(event, newValue) => {
            // Handles selection from dropdown
            onChange(newValue);
          }}
          onInputChange={(event, newInputValue, reason) => {
            // Handles typed input - only update on user input, not on selection
            if (reason === 'input') {
              onChange(newInputValue);
            }
          }}
          {...props}
          sx={textFieldStyles}
          renderInput={(params) => 
            <TextField 
                {...params}
                label={label}
            />
          }
        />
    );
}

const textFieldStyles = {
  '& .MuiInputBase-input': {
    color: 'white',
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: 'white',
  },
  '& .MuiInput-underline:hover:before': {
    borderBottomColor: 'white',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
  },
  '& .MuiInputBase-formLabel': {
    color: 'white',
  },
  '& .MuiFormLabel-root': {
    color: 'white',
  },
};