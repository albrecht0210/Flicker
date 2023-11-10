import { FormControl, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material";
import { useState } from "react";

function Rate(props) {
    const { criteria } = props;
    const [rate, setRate] = useState('');

    const handleChange = (event) => {
        setRate(event.target.value);
    };

    return (
        <Paper>
            <Typography>{criteria.name}</Typography>
            <FormControl fullWidth>
                <InputLabel id={`${criteria.name}-label`}>Rate Value</InputLabel>
                <Select
                    labelId={`${criteria.name}-label`}
                    id={`${criteria.name}-select`}
                    value={rate}
                    label="Rate"
                    onChange={handleChange}
                >
                    {[1, 2, 3, 4, 5].map((item) => (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Paper>
    )
}

export default Rate;