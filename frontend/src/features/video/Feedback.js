import { TextField } from "@mui/material";

function Feedback() {
    return (
        <TextField
            id="feedbackInput"
            label="Feedback"
            multiline
            rows={13}
        />
    );
}

export default Feedback;