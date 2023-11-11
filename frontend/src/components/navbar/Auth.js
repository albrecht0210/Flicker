import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useSelector } from "react-redux";

function Auth() {
    // const { paths, current } = useSelector((state) => state.history);

    return (
        <Breadcrumbs>
            {/* { paths.map((path, index) => (
                <Link key={index} underline="hover" color="inherit" href={path.url}>
                    {path.name} 
                </Link>
            )) }
            <Typography color="text.primary">{current.name}</Typography> */}
        </Breadcrumbs>
    );
}

export default Auth;