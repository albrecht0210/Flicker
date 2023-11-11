import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

function VideoOptions(props) {
    const { value, handleChange } = props; 

    return (
        <Paper sx={{ position: 'fixed', bottom: 40, left: "240px", right: 0 }} elevation={3}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={handleChange}
            >
                <BottomNavigationAction label="Chat" icon={<ChatIcon />} />
                <BottomNavigationAction label="Pitch" icon={<LightbulbIcon />} />
            </BottomNavigation>
        </Paper>
    )
}

export default VideoOptions;