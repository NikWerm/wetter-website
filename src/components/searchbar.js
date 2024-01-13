import React, { useState } from "react";
import { Autocomplete, Stack, TextField } from "@mui/material";

function SearchBar({ onEnter }) {
    const [searchValue, setSearchValue] = useState('');
    
    const city = [
        {label: "Berlin"},
        {label: "Manchester"},
        {label: "Liverpool"}
    ];

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onEnter(searchValue);
        }
    };

    return (
        <div className="flex items-center justify-center mt-4">
            <Stack sx={{ width: '50%' }}>
                <Autocomplete
                    options={city}
                    value={searchValue}
                    onChange={(event, newValue) => setSearchValue(newValue.label)}
                    renderInput={(params) => (
                        <TextField 
                            {...params} 
                            label="City" 
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: null,
                                className: "bg-gray-100",
                                onKeyDown: handleKeyDown,
                            }}
                        />
                    )}
                />
            </Stack>
        </div>
    );
}

export default SearchBar;
