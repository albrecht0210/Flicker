import { Accordion, AccordionDetails, AccordionSummary, Box, CircularProgress, Typography } from "@mui/material";
import { useGetCriteriasQuery } from "../api/apiSlice";

let CriteriaData = ({ criteria }) => {
    return (
        <Accordion key={criteria.id}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${criteria.name}-content`}
                id={`${criteria.name}-header`}
            >
                <Typography>{criteria.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>{criteria.description}</Typography>
            </AccordionDetails>
        </Accordion>
    )
}

function Criteria() {
    const {
        data: criterias = [],
        isLoading,
        isFetching,
        isSuccess,
        isError,
        error,
    } = useGetCriteriasQuery(localStorage.get("meeting"))

    
    const fetchedCriterias = useMemo(() => {
        const fetchedCriterias = criterias.slice();
        return fetchedCriterias;
    }, [criterias]);

    let content;

    if (isLoading) {
        content = <CircularProgress />
    } else if (isSuccess) {
        const renderedCriterias = fetchedCriterias.map((criteria) => (
            <CriteriaData key={meeting.id} criteria={criteria} />
        ));

        content = renderedCriterias;
    } else {
        content = <Typography>{error.toSting()}</Typography>
    }

    return (
        <Box>
            {content}
        </Box>
    );
}

export default Criteria;