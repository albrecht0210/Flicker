import { Toolbar, Typography } from "@mui/material";

function Logo() {
    return (
        <Toolbar sx={{ p: "0px 12px !important" }}>
            <img 
                src="/sample/wildcat.png" 
                alt="WildcatLogo" 
                style={{ width: '3rem' }}
            />
            <Typography variant="h5" sx={{ color: "#fecc00", letterSpacing: "0.2rem", fontWeight: "bold" }} >TEKNOPLAT</Typography>
        </Toolbar>
    );
}

export default Logo;