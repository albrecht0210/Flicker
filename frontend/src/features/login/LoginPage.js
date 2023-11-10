import { Box } from "@mui/material";
import LoginCard from "./LoginCard";
import { useState } from "react";
import LoginMessage from "./LoginMessage";

function LoginPage() {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    const handleClose = () => {
        setOpen(false);
        setMessage("");
    }

    const setError = (errMessage) => {
        setOpen(true);
        setMessage(errMessage);
    }

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "calc(100vh * .80)"
            }}
        >
            <LoginCard
                handleError={setError}
            />
            <LoginMessage
                open={open}
                handleClose={handleClose}
                meesage={message}
            />
        </Box>
    );
}

export default LoginPage;