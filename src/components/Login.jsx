import React, { useState, useEffect } from "react";
import Button from "../stylingComponents/Button";
import LoginFormStyling from "../stylingComponents/LoginFormStyling";
import Image from "../stylingComponents/Image";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import formSchema from "./formSchema";
import axiosWithAuth from "../utils/axiosWithAuth";

const initialFormValues = {
    username: "",
    password: "",
};

const initalFormErrors = {
    username: "",
    password: "",
};

export default function Login() {
    const { push } = useHistory();

    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState(initalFormErrors);
    const [disabled, setDisabled] = useState(false);

    const onInputChange = (event) => {
        const { name, value } = event.target;

        Yup.reach(formSchema, name)
            .validate(value)
            .then(() => {
                setFormErrors({
                    ...formErrors,
                    [name]: "",
                });
            })
            .catch((err) => {
                setFormErrors({
                    ...formErrors,
                    [name]: err.errors[0],
                });
            });

        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const newLogin = {
            username: formValues.username.trim(),
            password: formValues.password.trim(),
        };

        axiosWithAuth()
            .post("/api/auth/login", newLogin)
            .then((res) => {
                window.localStorage.setItem("token", res.data.token);
                push("/dashboard");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        formSchema.isValid(formValues).then((valid) => {
            setDisabled(!valid);
        });
    }, [formValues]);

    return (
        <LoginFormStyling className='form-horizontal' onSubmit={onSubmit}>
            <div className='errors'>
                <div>{formErrors.username}</div>
                <div>{formErrors.password}</div>
            </div>
            <Image src='assets/logo_w.png' />
            <div className='form-group'>
                <label className='control-label col-sm-2' for='username'>
                    Username:
                </label>
                <div className='col-sm-10'>
                    <input
                        type='text'
                        className='form-control'
                        id='username'
                        placeholder='Enter username'
                        value={formValues.username}
                        name='username'
                        onChange={onInputChange}
                    />
                </div>
            </div>
            <div className='form-group'>
                <label className='control-label col-sm-2' for='pwd'>
                    Password:
                </label>
                <div className='col-sm-10'>
                    <input
                        type='password'
                        className='form-control'
                        id='pwd'
                        placeholder='Enter password'
                        value={formValues.password}
                        name='password'
                        onChange={onInputChange}
                    />
                </div>
            </div>
            <div className='form-group'>
                <div className='col-sm-offset-2 col-sm-5'>
                    <Button
                        type='submit'
                        className='btn btn-default'
                        disabled={disabled}
                        onClick={onSubmit}
                    >
                        Sign In
                    </Button>
                    <p>
                        Not registered? Sign in <Link to='/signup'>Here</Link>
                    </p>
                </div>
            </div>
        </LoginFormStyling>
    );
}
