import { CircularProgress, List, ListItem, ListItemButton, ListItemText, Paper, Typography } from "@mui/material";
import { useGetParticpantsQuery } from "../api/apiSlice";
import { useMemo } from "react";


let ParticipantData = ({ participant }) => {
    return (
        <ListItem disablePadding key={participant.id}>
            <ListItemButton>
                <ListItemText primary={participant.full_name} />
            </ListItemButton>
        </ListItem>
    )
}

function Participants() {
    const {
        data: participants = [],
        isLoading,
        isSuccess,
        error,
    } = useGetParticpantsQuery(localStorage.getItem("course"));
    
    const fetchedParticipants = useMemo(() => {
        const fetchedParticipants = participants.slice();
        return fetchedParticipants;
    }, [participants]);

    let content;

    if (isLoading) {
        content = <CircularProgress />
    } else if (isSuccess) {
        const renderedParticipants = fetchedParticipants.map((participant) => (
            <ParticipantData key={participant.id} participant={participant} />
        ));

        content = renderedParticipants;
    } else {
        content = <Typography>{error.toSting()}</Typography>
    }

    return (
        <Paper>
            <List>
                {content}
            </List>
        </Paper>
    );
}

export default Participants;