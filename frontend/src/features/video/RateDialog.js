import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import TabContainer from "../../components/tabs/TabContainer";
import Rate from "./Rate";
import Feedback from "./Feedback";
import { useState } from "react";
import TabPanel from "../../components/tabs/TabPanel";
import { Button } from "bootstrap";

function RateDialog(props) {
    const { pitch, open, handleClose } = props;

    const tabChoices = [
        { value: 0, name: "Rating" },
        { value: 1, name: "Feedback" },
    ]
    
    const [tabValue, setTabValue] = useState(tabChoices[0].value);

    const handleTabChange = (event, value) => {
        setTabValue(value);
        localStorage.setItem("meetingStatus", value);
    }

    return (
        <Dialog handleClose={handleClose} open={open} sx={{  '.MuiDialog-paper': { minHeight: "600px", width: "500px !important"} }}>
            <DialogTitle>{pitch}</DialogTitle>
            <DialogContent>
                <TabContainer
                    tabs={tabChoices}
                    handleTabChange={handleTabChange}
                    selectedTab={tabValue}
                />
                <TabPanel selectedTab={tabValue} name="Rating" value={0}>
                    <Rate />
                </TabPanel>
                <TabPanel selectedTab={tabValue} name="Feedback" value={1}>
                    <Feedback />
                </TabPanel>
            </DialogContent>
            <DialogActions>
                <Button>Save</Button>
                <Button>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}

export default RateDialog;