import { Box } from "@mui/material";

function TabPanel(props) {
    const { selectedTab, name, value, children } = props;
    return (
        <div 
            role="tabpanel" 
            hidden={selectedTab !== value} 
            id={`${name}-tabpanel`}
            aria-labelledby={`${name}-tab`}
        >
            <Box sx={{ p: 3 }}>
                { children }
            </Box>
        </div>
    );
}

export default TabPanel;