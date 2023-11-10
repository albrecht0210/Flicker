import { Button, CircularProgress, TableBody, TableCell, TableRow } from "@mui/material";
import { useGetMeetingsQuery } from "../api/apiSlice";
import { useMemo } from "react";

let MeetingData = ({ meeting }) => {
    const handleView = (id) => {
        localStorage.setItem("meeting", id);
    }
    return (
        <TableRow key={meeting.id}>
            <TableCell>
                <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleView(meeting.id)}
                >
                    View
                </Button>
            </TableCell>
            <TableCell>{meeting.name}</TableCell>
        </TableRow>
    )
}

function MeetingTableData() {
    const {
        data: meetings = [],
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetMeetingsQuery(localStorage.getItem("course"));


    const fetchedMeetings = useMemo(() => {
        const fetchedMeetings = meetings.slice();
        return fetchedMeetings;
    }, [meetings]);

    let content;

    if (isLoading) {
        content = <CircularProgress />
    } else if (isSuccess) {
        const renderedMeetings = fetchedMeetings.map((meeting) => (
            <MeetingData key={meeting.id} meeting={meeting} />
        ));

        content = renderedMeetings;
    } else if (isError) {
        content = (
            <TableRow>
                <TableCell></TableCell>
                <TableCell>{error.toSting()}</TableCell>
            </TableRow>
        );
    }

    return (
        <TableBody>
            {content}            
        </TableBody>
    );
}

export default MeetingTableData;