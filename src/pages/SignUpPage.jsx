import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "styled-components";
import { FaChevronLeft } from "react-icons/fa";
import Select from "react-select";

export default function SignUpPage() {
  const serverUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [userType, setUserType] = useState("customer");

  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    axios
      .get(`${serverUrl}/city`)
      .then(({ data: arrayCities }) => {
        setCities(arrayCities);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }, []);

  const cityOptions = cities.map((city) => ({
    value: city.id,
    label: city.name,
  }));

  function signUp(e) {
    e.preventDefault();

    if (password != confirmPass) return alert("Senhas não conferem!");

    const user = {
      name,
      email,
      phone,
      image,
      password,
      cityId: selectedCity.value,
    };

    axios
      .post(`${serverUrl}/signup/${userType}`, user)
      .then((resp) => {
        navigate("/");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }

  return (
    <>
      <SCHeader>
        <Link to={"/"}>
          <FaChevronLeft color="white" />
        </Link>
        <h1>Cadastro</h1>
        <div />
      </SCHeader>

      <SCContainer>
        <form onSubmit={signUp}>
          <SCSelectButtons>
            <label>
              <input
                type="radio"
                value="customer"
                checked={userType === "customer"}
                onChange={(e) => setUserType(e.target.value)}
              />
              Usuário
            </label>
            <label>
              <input
                type="radio"
                value="freelancer"
                checked={userType === "freelancer"}
                onChange={(e) => setUserType(e.target.value)}
              />
              Freelancer
            </label>
          </SCSelectButtons>

          <input
            placeholder="nome"
            type="text"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            placeholder="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            placeholder="foto"
            type="url"
            onChange={(e) => setImage(e.target.value)}
            required
          />
          <input
            placeholder="telefone"
            type="number"
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            placeholder="senha"
            type="password"
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            placeholder="confirmar senha"
            type="password"
            autoComplete="new-password"
            onChange={(e) => setConfirmPass(e.target.value)}
            required
          />
          <strong>
            no momento disponível apenas cidades de santa catarina
          </strong>

          <SCSelect
            options={cityOptions}
            value={selectedCity}
            onChange={(city) => setSelectedCity(city)}
            placeholder="Selecione uma cidade..."
            isSearchable
            required
          />

          <SCButton type="submit">Cadastrar</SCButton>
        </form>

        <BallOfLight />
      </SCContainer>
    </>
  );
}

const SCHeader = styled.header`
  margin-top: 40px;
  background: none;
  width: 100vw;
  padding-left: 28px;
  padding-right: 28px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;

  h1 {
    font-family: "Inter";
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    color: white;
  }
`;

const SCSelectButtons = styled.div`
  display: flex;
  color: white;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  gap: 20px;

  label {
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
  }

  input {
    margin-right: 5px;
  }
`;

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

  form {
    position: relative;
    z-index: 1;

    > strong {
      display: flex;
      width: 100%;
      font-family: "Inter";
      color: #fc3838;
      font-size: 11px;
      justify-content: center;
    }

    > input {
      box-sizing: border-box;
      width: 100%;
      height: 54px;
      border-radius: 8px;
      border: 1px solid #642cdc;
      background: #0b0811;
      margin-bottom: 10px;
      padding: 27px;
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

const BallOfLight = styled.div`
  position: fixed;
  width: 415px;
  height: 424px;
  flex-shrink: 0;
  border-radius: 424px;
  background: #7a3cff;
  filter: blur(250px);
  right: -130px;
`;

const SCSelect = styled(Select)`
  margin-top: 8px;
`;
