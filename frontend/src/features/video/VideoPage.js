import { Box, Grid, Stack } from "@mui/material";
import VideoOptions from "./VideoOptions";
import { useState } from "react";
import VideoDisplay from "./Video";
import RatePanel from "./RatePanel";
import RateDialog from "./RateDialog";

function VideoPage() {
    const [option, setOption] = useState(1);
    const [openRate, setOpenRate] = useState(false);
    const [pitchSelected, setPitchSelected] = useState(null);
    const [pitchNameSelected, setPitchNameSelected] = useState("null");

    const handleChangeSelectedPitch = (pitch, pitchName) => {
        setPitchSelected(pitch);
        setPitchNameSelected(pitchName);
        console.log("rate clicked")
        setOpenRate(true);
    }
    
    const handleCloseRate = () => {
        setOpenRate(false);
    }

    const handleOptionChange = (event, newValue) => {
        setOption(newValue);
    }
    return (
        <Box>
            <Stack>
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <VideoDisplay />
                    </Grid>
                    <Grid item xs={4}>
                        <RatePanel handleClick={handleChangeSelectedPitch} />
                    </Grid>
                </Grid>
                <VideoOptions value={option} handleChange={handleOptionChange} />
            </Stack>
            <RateDialog pitch={pitchNameSelected} open={openRate} handleClose={handleCloseRate} />
        </Box>
    );
}

export default VideoPage;