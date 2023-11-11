import { Divider, Drawer } from "@mui/material";
import MainOptions from "./MainOptions";
import AppOptions from "./AppOptions";
import UserOption from "./UserOption";
import Logo from "./Logo";

function SideNav(props) {
    const { drawerWidth } = props;

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box'
                }
            }}
            variant="permanent"
            anchor="left"
        >
            <Logo />
            <Divider />
            <MainOptions />
            <Divider />
            <AppOptions />
            <Divider sx={{ mt: 'auto' }} />
            <UserOption drawerWidth={drawerWidth} />
        </Drawer>
    );
}

SideNav.defaultProps = {
    drawerWidth: 240,
};

export default SideNav;