import { Alert, Snackbar } from "@mui/material";

function LoginMessage(props) {
    const { open, handleClose, message } = props;

    return (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
        >
            <Alert severity="error" sx={{ width: "100%" }}>
                { message }
            </Alert>
        </Snackbar>
    );
}

export default LoginMessage;