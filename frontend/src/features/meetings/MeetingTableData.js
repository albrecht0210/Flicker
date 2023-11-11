import { Button, TableBody, TableCell, TableRow } from "@mui/material";
import { useGetMeetingsQuery } from "../api/apiSlice";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeMeeting } from "./meetingSlice";
import { useNavigate } from "react-router-dom";
import { formatStringToUrl } from "../../utils/helper";

let MeetingData = ({ meeting }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleView = (id) => {
        localStorage.setItem("selectedMeeting", id);
        dispatch(storeMeeting(id));
        navigate(`/details/${formatStringToUrl(meeting.name)}`);
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
            <TableCell>{(parseFloat(meeting.teacher_weight_score) * 100).toFixed(0) + "%"}</TableCell>
            <TableCell>{(parseFloat(meeting.student_weight_score) * 100).toFixed(0) + "%"}</TableCell>
        </TableRow>
    )
}

function MeetingTableData() {
    const meetingStatus = ["pending", "in_progress", "completed"];

    const { selectedMeetingStatus } = useSelector((state) => state.meeting);
    const {
        data: meetings = [],
        isLoading,
        isSuccess,
        isError,
        error,
        refetch,
    } = useGetMeetingsQuery({courseId: localStorage.getItem("selectedCourse"), status: meetingStatus[selectedMeetingStatus]});

    useEffect(() => {
        const fetchAgain = async () => {
            const { data: meetings = [] } = await refetch();
            console.log(meetings)
        }
        fetchAgain()
    }, [selectedMeetingStatus, refetch]);

    const fetchedMeetings = useMemo(() => {
        const fetchedMeetings = meetings.slice();
        return fetchedMeetings;
    }, [meetings]);

    let content;

    if (isLoading) {
        content = (
            <TableRow>
                <TableCell>Loading...</TableCell>
            </TableRow>
        );
    } else if (isSuccess) {
        const renderedMeetings = fetchedMeetings.map((meeting) => (
            <MeetingData key={meeting.id} meeting={meeting} />
        ));

        content = renderedMeetings;
    } else if (isError) {
        content = (
            <TableRow>
                <TableCell></TableCell>
                <TableCell>{error.toString()}</TableCell>
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