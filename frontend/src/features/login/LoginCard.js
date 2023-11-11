import { Card, CardContent, Stack, Typography } from "@mui/material";
import LoginInput from "./LoginInput";
import LoginButton from "./LoginButton";
import { useAuthenticateMutation } from "../api/apiSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { storeAuth } from "./authSlice";
import Cookies from "js-cookie";

function LoginCard(props) {
    const stateAuth = useSelector((state) => state.auth);
    const { handleError } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [authenticate, { isLoading }] = useAuthenticateMutation();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((previousFormData) => ({
            ...previousFormData,
            [name]: value
        }));
    }

    const canSave = [formData.username, formData.password].every(Boolean) && !isLoading;

    const handleOnFormSubmit = async (e) => {
        e.preventDefault();
        if (canSave) {
            try {
                const response = await authenticate({ username: formData.username, password: formData.password }).unwrap();
                setFormData((previousFormData) => ({
                    ...previousFormData,
                    [formData.password]: ""
                }));
                Cookies.set("accessToken", response.access);
                Cookies.set("refreshToken", response.refresh);
                dispatch(storeAuth({ accessToken: response.access, refreshToken: response.refresh }));
                navigate('/');
            } catch (err) {
                console.error("Failed to login: ", err);
                handleError(err);
            }
        }
    };

    return (
        <Card sx={{ width: "calc(100% * .35)" }}>
            <CardContent>
                <form onSubmit={handleOnFormSubmit} >
                    <Stack spacing={3}>
                        <Typography 
                            variant="h6" 
                            textAlign="center"
                        >
                            Login
                        </Typography>
                        <LoginInput 
                            name="username"
                            value={formData.username}
                            handleChange={handleInputChange}
                            disabled={isLoading}
                        />
                        <LoginInput 
                            name="password"
                            value={formData.password}
                            handleChange={handleInputChange}
                            disabled={isLoading}
                        />
                        <LoginButton disabled={isLoading} />
                    </Stack>
                </form>
            </CardContent>
        </Card>
    );
}

export default LoginCard;