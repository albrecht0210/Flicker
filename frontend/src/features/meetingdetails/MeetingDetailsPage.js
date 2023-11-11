import { Button, Box, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { useGetMeetingQuery } from "../api/apiSlice";
import TabContainer from "../../components/tabs/TabContainer";
import Criteria from "./Criteria";
import Pitch from "./Pitch";
import { useState } from "react";
import TabPanel from "../../components/tabs/TabPanel";
import Comment from "./Comment";
import Participants from "./Participants";
import { useNavigate } from "react-router-dom";

let MeetingDetail = ({ meeting }) => {
    const tabChoices = [
        { value: 0, name: "Pitch" },
        { value: 1, name: "Criteria" },
        { value: 2, name: "Comment" }
    ]
    const storedDetailTab = localStorage.getItem('detailTab');
    const initialTabValue = storedDetailTab ? storedDetailTab : tabChoices[0].value;
    
    const navigate = useNavigate();

    const [tabValue, setTabValue] = useState(initialTabValue);

    const handleTabChange = (event, value) => {
        setTabValue(value);
        localStorage.setItem("meetingStatus", value);
    }

    const handleJoinClick = () => {
        navigate(`/video_meeting`);
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <Stack spacing={3}>
                    <Stack direction="row" spacing={5}>
                        <Typography variant="h5">{meeting.name}</Typography>
                        <Button onClick={handleJoinClick} variant="contained">Join</Button>
                    </Stack>
                    <Typography sx={{ fontWeight: "100" }} variant="h6">{meeting.description}</Typography>
                </Stack>
                <TabContainer
                    tabs={tabChoices}
                    handleTabChange={handleTabChange}
                    selectedTab={tabValue}
                />
                <TabPanel selectedTab={tabValue} name="Pitch" value={0}>
                    <Pitch />
                </TabPanel>
                <TabPanel selectedTab={tabValue} name="Criteria" value={1}>
                    <Criteria />
                </TabPanel>
                <TabPanel selectedTab={tabValue} name="Comment" value={2}>
                    <Comment />
                </TabPanel>
            </Grid>
            <Grid item xs={4}>
                <Participants />
            </Grid>
        </Grid>
    )
}

function MeetingDetailsPage() {
    const {
        data: meeting,
        isFetching,
        isSuccess,
    } = useGetMeetingQuery(localStorage.getItem("selectedMeeting"));

    let content;

    if (isFetching) {
        content = <CircularProgress />
    } else if (isSuccess) {
        content = <MeetingDetail meeting={meeting} />
    }

    return (
        <Box>
            {content}
        </Box>
    );
}

export default MeetingDetailsPage;