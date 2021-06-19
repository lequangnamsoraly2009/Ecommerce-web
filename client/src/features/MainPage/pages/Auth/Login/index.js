import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
// import { useDispatch } from "react-redux";
// import refreshToken from "../../../../../app/authSlice";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // const dispatch = useDispatch();

  const onChangeForm = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/login", { ...user });
      localStorage.setItem("firstLogin", true);
      window.location.href = "/";
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

 

  return (
    <LoginContainer>
      <h2>Login</h2>

      <form onSubmit={onSubmitForm}>
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          value={user.email}
          onChange={onChangeForm}
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          value={user.password}
          onChange={onChangeForm}
          autoComplete="on"
        />
        <ButtonSubmit>
          <button type="submit">Login</button>
          <Link to="/user/register">Register</Link>
        </ButtonSubmit>
      </form>
    </LoginContainer>
  );
}
const LoginContainer = styled.div`
  max-width: 500px;
  border: 2px solid rgb(3, 165, 206);
  border-radius: 5px;
  padding: 30px;
  margin: 50px auto;
  h2 {
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #555;
  }
  input {
    width: 100%;
    height: 40px;
    margin: 10px 0;
    padding: 0 5px;
    outline: rgb(3, 165, 206);
    border: 1px solid rgb(3, 165, 206);
  }
`;

const ButtonSubmit = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    height: 40px;
    width: 150px;
    background: rgb(3, 165, 206);
    color: white;
    text-transform: uppercase;
    letter-spacing: 2px;
    border-radius: 15px;
  }
  > a {
    border: 1px solid #999;
    border-radius: 15px;
    padding: 8px;
    font-size: 20px;
    color: orange;
    letter-spacing: 1.3px;
    text-transform: uppercase;
  }
`;
export default Login;
