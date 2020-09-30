import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export const SignUpForm = () => {
  const [signUpInput, setSignUpInput] = useState({});

  const history = useHistory();

  const handleChange = (event) => {
    setSignUpInput({ ...signUpInput, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        'https://wunderlist-api-2020.herokuapp.com/api/auth/register',
        signUpInput
      )
      .then((response) => {
        console.log('response from POST request in SIGNUP form', response);
        localStorage.setItem('token', response.data.token);
        history.push('/dashboard');
      })
      .catch((error) => console.log('Error from POST in SIGNUP form', error));
    setSignUpInput({
      username: '', 
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    });
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h1>Sign Up </h1>
      <label>
         Username:
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={signUpInput.username || ''}
          onChange={handleChange}
        />
      </label>
      <label>
        First Name:
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={signUpInput.firstname || ''}
          onChange={handleChange}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={signUpInput.lastname || ''}
          onChange={handleChange}
        />
      </label>
      <label>
        Email Here:
        <input
          type="text"
          name="email"
          placeholder="Email Here"
          value={signUpInput.email || ''}
          onChange={handleChange}
        />
      </label>
      <label>
        Password Here:
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={signUpInput.password || ''}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
};