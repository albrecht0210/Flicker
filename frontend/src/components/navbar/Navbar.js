import { AppBar, Toolbar } from "@mui/material";
import NoAuth from "./NoAuth";
import { useSelector } from "react-redux";
import Auth from "./Auth";
// import Auth from "./TopNav/Auth";
// import { useSelector } from "react-redux";

function Navbar(props) {
    const { accessToken } = useSelector((state) => state.auth);
    const { drawerWidth } = props;

    return (
        <AppBar
            position="fixed"
            sx={{
                width: `calc(100% - ${drawerWidth}px)`,
                ml: `${drawerWidth}px`
            }}
        >
            <Toolbar>
                { !accessToken ? <NoAuth /> : <Auth /> }
            </Toolbar>
        </AppBar>
    );
}

Navbar.defaultProps = {
    drawerWidth: 240,
};

export default Navbar;