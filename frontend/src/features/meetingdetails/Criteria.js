import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, CircularProgress, Typography } from "@mui/material";
import { useGetCriteriasQuery } from "../api/apiSlice";
import { useMemo } from 'react';

let CriteriaData = ({ criteria }) => {
    console.log(criteria)
    return (
        <Accordion key={criteria.id}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${criteria.display_criteria.name}-content`}
                id={`${criteria.display_criteria.name}-header`}
            >
                <Typography>{criteria.display_criteria.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>{criteria.display_criteria.description}</Typography>
                <Typography>{criteria.weight}</Typography>
            </AccordionDetails>
        </Accordion>
    )
}

function Criteria() {
    const {
        data: criterias = [],
        isLoading,
        isSuccess,
        error,
    } = useGetCriteriasQuery(localStorage.getItem("selectedMeeting"))

    console.log(criterias)
    const fetchedCriterias = useMemo(() => {
        const fetchedCriterias = criterias.slice();
        return fetchedCriterias;
    }, [criterias]);

    let content;

    if (isLoading) {
        content = <CircularProgress />
    } else if (isSuccess) {
        const renderedCriterias = fetchedCriterias.map((criteria, index) => (
            <CriteriaData key={index} criteria={criteria} />
        ));

        content = renderedCriterias;
    } else {
        content = <Typography>{error.toString()}</Typography>
    }

    return (
        <Box>
            {content}
        </Box>
    );
}

export default Criteria;