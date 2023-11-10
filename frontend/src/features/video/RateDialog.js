import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import TabContainer from "../../components/tabs/TabContainer";
import Rate from "./Rate";
import Feedback from "./Feedback";
import { useState } from "react";
import TabPanel from "../../components/tabs/TabPanel";

function RateDialog(props) {
    const { pitch, open, handleClose } = props;
    
    const tabChoices = [
        { value: 0, name: "Rating" },
        { value: 1, name: "Feedback" },
    ]
    
    const [tabValue, setTabValue] = useState(tabChoices[0].value);

    return (
        <Dialog handleClose={handleClose} open={open}>
            <DialogTitle>{pitch.name}</DialogTitle>
            <DialogContent>
                <TabContainer
                    tabs={tabChoices}
                    handleTabChange={handleClose}
                    selectedTab={tabValue}
                />
                <TabPanel selectedTab={tabValue} name="Rating" value={0}>
                    <Rate />
                </TabPanel>
                <TabPanel selectedTab={tabValue} name="Feedback" value={1}>
                    <Feedback />
                </TabPanel>
            </DialogContent>
        </Dialog>
    );
}

export default RateDialog;