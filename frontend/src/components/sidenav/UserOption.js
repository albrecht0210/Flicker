import { Button, CircularProgress, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetAccountQuery } from "../../features/api/apiSlice";
import { deStoreAuth } from "../../features/login/authSlice";
import Cookies from "js-cookie";

let AccountButton  = ({ account, drawerWidth }) => {
    return (
        <Button variant="text">
            <img
                src="/sample/profile_pic.jpg" // Replace with the URL of your image
                alt="UserProfile"
                style={{ width: '30px', height: '30px', marginRight: '5px', borderRadius: '5px' }}
            />
            <Stack spacing={0}>
                <Typography
                    variant="caption"
                    noWrap={true}
                    sx={{ width: `calc(${drawerWidth}px * .52)` }}
                    textAlign="left"
                >
                    { account.full_name }
                </Typography>
                <Typography 
                    textAlign="left" 
                    variant="caption" 
                    fontSize={10}
                >
                    {account.username}
                </Typography>
            </Stack>
        </Button>
    )
}

function UserOption(props) {
    const { drawerWidth } = props;

    const {
        data: account,
        isFetching,
        isSuccess,
    } = useGetAccountQuery();

    let content;

    if (isFetching) {
        content = <CircularProgress />
    } else if (isSuccess) {
        content = <AccountButton account={account} drawerWidth={drawerWidth} />
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(deStoreAuth());
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        navigate("/");
    }

    return (
        <Toolbar sx={{ p: "0px 12px !important" }}>
            <Stack
                direction="row"
                spacing={0}
                alignItems="center"
            >
                {content}
                <IconButton aria-label="LogoutUser" onClick={handleLogout}>
                    <Logout />
                </IconButton>
            </Stack>
        </Toolbar>
    );
}

export default UserOption;