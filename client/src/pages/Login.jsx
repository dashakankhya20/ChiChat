import React, { useState, useContext } from "react";
import styled from "styled-components";
import logo from "../utils/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { loginRoute } from "../utils/Api_Routes";
import { MyContext } from "../MyContext";

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(MyContext);
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light"
  }

  const handleVailidation = () => {
    const { username, password } = values;
    //console.log(username.trim());
    if (!username.trim() || !password.trim()) {
      toast.error("Fields should not be empty or contain only spaces or tabs!", toastOptions);
      //console.log("Name trim")
      return false;
    } else if (username.length < 3) {
      toast.error("Username must be greater than 3 characters!", toastOptions);
      return false;
    }
    else if (password.length > 8 || password.length < 8) {
      toast.error("Password should be 8 characters.", toastOptions);
      //console.log("Name trim")
      return false;
    }
    return true;
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (handleVailidation()) {
        const { username, password } = values;
        const { data } = await axios.post(loginRoute, {
          username,
          password
        });
        if (data.status === "ok") {
          console.log(data);
          setUser(data.userExists);
          console.log("User", user);
          toast.success("Login Successfully!", toastOptions);
          navigate("/")
        }
      } else {
        toast.error("Some problem occurred!", toastOptions);
      }
    } catch (error) {
      toast.error(error.response.data, toastOptions);
    }
  };


  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
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
              min="3"
              onChange={(e) => handleChange(e)}
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
          </div>
          <button type="submit">LOGIN</button>
          <span>
            Don't have an account? <Link to="/register">REGISTER</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
};

const FormContainer = styled.div`
  width: 100vw;
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

export default Login;
