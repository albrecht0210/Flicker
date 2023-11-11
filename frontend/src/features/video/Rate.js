import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Paper, Select, Stack, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useGetCriteriasQuery } from "../api/apiSlice";

let CriteriaRate = ({ criteria }) => {
    const [rate, setRate] = useState('');
    
    const handleChange = (event) => {
        setRate(event.target.value);
    };
    
    return (
        <Box key={criteria.id} >
            <Typography>{criteria.name}</Typography>
            <FormControl fullWidth>
                <InputLabel id={`${criteria.display_criteria.name}-label`}>{criteria.display_criteria.name}</InputLabel>
                <Select
                    labelId={`${criteria.display_criteria.name}-label`}
                    id={`${criteria.display_criteria.name}-select`}
                    value={rate}
                    label="Rate"
                    onChange={handleChange}
                >
                    {[1, 2, 3, 4, 5].map((item) => (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}

function Rate(props) {
    const {
        data: criterias = [],
        isLoading,
        isSuccess,
        error,
    } = useGetCriteriasQuery(localStorage.getItem("selectedMeeting"))
    
    const fetchedCriterias = useMemo(() => {
        const fetchedCriterias = criterias.slice();
        return fetchedCriterias;
    }, [criterias]);

    let content;

    if (isLoading) {
        content = <CircularProgress />
    } else if (isSuccess) {
        const renderedCriterias = fetchedCriterias.map((criteria, index) => (
            <CriteriaRate key={index} criteria={criteria} />
        ));

        content = renderedCriterias;
    } else {
        content = <Typography>{error.toString()}</Typography>
    }

    return (
        <Paper>
            <Stack spacing={3}>
                { content }
            </Stack>
        </Paper>
    )
}

export default Rate;