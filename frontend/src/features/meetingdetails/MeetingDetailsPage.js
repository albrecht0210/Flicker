import { CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { useGetMeetingQuery } from "../api/apiSlice";
import TabContainer from "../../components/tabs/TabContainer";
import Criteria from "./Criteria";
import Pitch from "./Pitch";
import { useState } from "react";
import TabPanel from "../../components/tabs/TabPanel";
import Comment from "./Comment";

let MeetingDetail = ({ meeting }) => {
    const tabChoices = [
        { value: 0, name: "Pitch" },
        { value: 1, name: "Criteria" },
        { value: 2, name: "Comment" }
    ]
    const storedDetailTab = localStorage.getItem('detailTab');
    const initialTabValue = storedDetailTab ? storedDetailTab : tabChoices[0].value;
    
    const [tabValue, setTabValue] = useState(initialTabValue);

    const handleTabChange = (event, value) => {
        setTabValue(value);
        localStorage.setItem("meetingStatus", value);
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <Stack>
                    <Typography variant="h5">{meeting.name}</Typography>
                    <Typography variant="h5">{meeting.description}</Typography>
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

            </Grid>
        </Grid>
    )
}

function MeetingDetailsPage() {
    const {
        data: meeting,
        isFetching,
        isSuccess,
    } = useGetMeetingQuery(localStorage.getItem("meeting"));

    let content;

    if (isFetching) {
        content = <CircularProgress />
    } else if (isSuccess) {
        content = <MeetingDetail meeting={meeting} />
    }

    return (
        {content}
    );
}

export default MeetingDetailsPage;