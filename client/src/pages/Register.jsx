import React, { useState, useContext } from "react";
import styled from "styled-components";
import logo from "../utils/images/logo.png";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { MyContext } from "../MyContext";
import { registerRoute } from "../utils/Api_Routes";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(MyContext);
  const [values, setValues] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  }
  const handleVailidation = () => {
    const { username, firstName, lastName, email, password, confirmPassword } = values;
    //console.log(username.trim());
    if (!username.trim() || !firstName.trim() || !lastName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      toast.error("Fields should not be empty or contain only spaces or tabs!", toastOptions);
      //console.log("Name trim")
      return false;

    }
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password should be same!", toastOptions);
      //console.log("Name trim")
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters", toastOptions);
      //console.log("Name trim")
      return false;
    } else if (password.length > 8 || password.length < 8) {
      toast.error("Password should be 8 characters.", toastOptions);
      //console.log("Name trim")
      return false;
    }
    console.log("This will print however")
    return true;
    
  }
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (handleVailidation()) {
        const { username, firstName, lastName, email, password } = values;
        const { data } = await axios.post(registerRoute, {
          username,
          firstName,
          lastName,
          email,
          password
        });
        if (data.status === "ok") {
          toast.success("Registration Successfully!", toastOptions);
          setUser(data.newUser);
          navigate("/setAvatar");
        }
      } 
    } catch (error) {
      toast.error(error.response.data, toastOptions);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  console.log(user && user);
  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="chichat_logo">
            <img src={logo} alt="Brand Name" />
          </div>
          <div className="chichat_input">
            <label id="username">Enter Username:</label>
            <input
              type="text"
              name="username"
              placeholder="eg: akan97"
              required
              onChange={(e) => handleChange(e)}
            />

            <label id="firstName">Enter Firstname:</label>
            <input
              type="text"
              name="firstName"
              placeholder="eg: Akankhya"
              required
              onChange={(e) => handleChange(e)}
            />

            <label id="lastName">Enter Lastname:</label>
            <input
              type="text"
              name="lastName"
              placeholder="eg: Dash"
              required
              onChange={(e) => handleChange(e)}
            />

            <label id="email">Enter EmailID:</label>
            <input
              type="email"
              name="email"
              placeholder="eg: example@gmail.com"
              required
              onChange={(e) => handleChange(e)}
              autoComplete="email"
            />

            <label id="password">Enter Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Password must be 8 characters"
              required
              onChange={(e) => handleChange(e)}
              autoComplete="new-password"
            />

            <label id="confirmPassword">Confirm Your Password:</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              required
              onChange={(e) => handleChange(e)}
              autoComplete="new-password"
            />
          </div>
          <button type="submit">CREATE ACCOUNT</button>
          <span>
            Already have an account? <Link to="/login">LOGIN</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
};

const FormContainer = styled.div`
  width: 100vw;
  background-image: url("../src/utils/images/doodle_background.jpg");
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    box-shadow: 0 0 10px 5px rgba(105, 54, 245, 0.1);
    margin: 5rem;
    gap: 0.9rem;
    padding: 5rem;
    border-radius: 2rem;
    .chichat_logo {
      width: 14rem;
      height: 14rem;
      img {
        height: 100%;
        width: 100%;
        object-fit: contain;
      }
    }
    .chichat_input {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
      font-weight: 400;
      input {
        padding: 1rem;
        border-radius: 0.4rem;
        border: 0.1rem solid grey;
        width: 20rem;
        &:focus {
          border: 0.1rem solid #6936f5;
          outline: none;
        }
      }
    }
  }
`;

export default Register;
