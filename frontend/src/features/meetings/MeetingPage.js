import { Box } from "@mui/material";
import { useState } from "react"
import TabContainer from "../../components/tabs/TabContainer";
import TabPanel from "../../components/tabs/TabPanel";
import MeetingSearchInput from "./MeetingSearchInput";
import MeetingTable from "./MeetingTable";
import { useDispatch } from "react-redux";
import { storeMeetingStatus } from "./meetingSlice";

function MeetingPage() {
    const dispatch = useDispatch();

    const tabChoices = [
        { value: 0, name: "Pending" },
        { value: 1, name: "In Progress" },
        { value: 2, name: "Completed" }
    ]
    const storedMeetingStatus = localStorage.getItem('selectedMeetingStatus');
    const initialTabValue = storedMeetingStatus ? Number(storedMeetingStatus) : tabChoices[0].value;
    
    const [tabValue, setTabValue] = useState(initialTabValue);
    const [search, setSearch] = useState("");

    const handleTabChange = (event, value) => {
        dispatch(storeMeetingStatus({ selectedMeetingStatus: value }));
        setTabValue(value);
        localStorage.setItem("selectedMeetingStatus", value);
    }

    const handleSearchInput = (event) => {
        setSearch(event.target.value);
    }

    return (
        <Box>
            <TabContainer
                tabs={tabChoices}
                handleTabChange={handleTabChange}
                selectedTab={tabValue}
                inputField={<MeetingSearchInput value={search} handleChange={handleSearchInput} />}
            />
            { tabChoices.map((tabItem) => (
                <TabPanel key={tabItem.value} selectedTab={tabValue} name={tabItem.name} value={tabItem.value}>
                    <MeetingTable />
                </TabPanel>
            )) }
        </Box>
    )
}

export default MeetingPage;