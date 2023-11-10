import { useEffect } from "react";
import { selectApi } from "../features/api/apiSlice";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../components/navbar/Navbar";
import { Box, Toolbar } from "@mui/material";


function AuthenticatedLayout() {
    const apiState = useSelector(selectApi);
    console.log(apiState)
    const location = useLocation();
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    const currentURL = location.pathname;

    // useEffect(() => { // check if token is available
    //     if (!token) {
    //         navigate("/");
    //     }
    // }, [navigate, token]);

    // useEffect(() => { // load history using url path
    //     dispatch(clearHistory());
    //     const splitCurrentURL = currentURL.split("/").filter(segment => segment !== '');
    //     console.log(splitCurrentURL);
    //     if (splitCurrentURL.length !== 0) {
    //         let completeURL = '';
    //         splitCurrentURL.forEach(path => {
    //             completeURL += `/${path}`;
    //             dispatch(pushHistory({ name: formatUrlToString(path), url: completeURL }));
    //         });
    //     } else {
    //         dispatch(pushHistory({ name: "Dashboard", url: "/" }));
    //     }
    //     dispatch(doneLoadingHistory());
    // }, [dispatch, currentURL]);

    // if (loadingProfile || loadingHistory) {
    //     return (
    //         <Box>
    //             <CircularProgress />
    //         </Box>
    //     );
    // }
    
    return (
        <>
            <Navbar />
            <Box pl="280px" pr="40px">
                <Toolbar sx={{ mb: '25px' }} />
                <Outlet />
            </Box>
        </>
    );
}

export default AuthenticatedLayout;