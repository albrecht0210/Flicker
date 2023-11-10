import { AppBar, Toolbar } from "@mui/material";
import NoAuth from "./NoAuth";
// import Auth from "./TopNav/Auth";
// import { useSelector } from "react-redux";

function Navbar(props) {
    // const { token } = useSelector((state) => state.auth)
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
                {/* { !token ? <NoAuth /> : <Auth /> } */}
                <NoAuth />
            </Toolbar>
        </AppBar>
    );
}

Navbar.defaultProps = {
    drawerWidth: 240,
};

export default Navbar;