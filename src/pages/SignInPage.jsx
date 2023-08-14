import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import logoImage from "../assets/logo.svg";

export default function SignInPage() {
  const serverUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function signIn(e) {
    e.preventDefault();

    const user = { email, password };

    axios
      .post(`${serverUrl}/`, user)
      .then((resp) => {
        const token = "Bearer " + resp.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("userType", resp.data.userType);
        navigate("/home");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }

  return (
    <SCContainer>
      <img src={logoImage} alt="log" />

      <form onSubmit={signIn}>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="senha"
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <SCButton type="submit">Entrar</SCButton>
      </form>

      <SCButtonCreateAccount>
        <Link to={"/signup"}>Criar Conta</Link>
      </SCButtonCreateAccount>

      <BallOfLight />
    </SCContainer>
  );
}

const SCContainer = styled.div`
  background-color: #0b0c0d;
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  padding: 28px;

  img {
    margin-bottom: 100px;
    width: 239px;
  }

  form {
    position: relative;
    z-index: 1;

    input {
      width: 100%;
      height: 53px;
      background: none;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      box-sizing: border-box;
      padding: 27px;
      color: #f0e9ff;
      margin-bottom: 8px;
      color: #f0e9ff;
      font-size: 14px;
      font-weight: 500;

      &::placeholder {
        text-align: right;
        color: #f0e9ff;
        font-size: 14px;
        font-weight: 500;
      }
    }
  }
`;

const SCButton = styled.button`
  width: 100%;
  height: 41px;
  border-radius: 8px;
  background: #642cda;
  border: none;
  margin-top: 100px;

  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  color: #fff;
`;

const SCButtonCreateAccount = styled.button`
  width: 100%;
  height: 41px;
  border-radius: 8px;
  background: none;
  border: none;
  margin-top: 5px;

  a {
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    color: white;
  }
`;

const BallOfLight = styled.div`
  position: absolute;
  width: 293px;
  height: 297px;
  flex-shrink: 0;
  border-radius: 297px;
  background: #5200ff;
  filter: blur(150px);
`;
