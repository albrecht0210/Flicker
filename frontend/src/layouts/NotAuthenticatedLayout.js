import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

function NotAuthenticatedLayout() {
    return (
        <>
            <Navbar drawerWidth={0} />
            <Box pl="40px" pr="40px">
                <Toolbar sx={{ mb: '25px' }} />
                <Outlet />
            </Box>
        </>
    );
}

export default NotAuthenticatedLayout;