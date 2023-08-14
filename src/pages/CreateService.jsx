import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import axios from "axios";

export default function CreateService() {
  const serverUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [paymentType, setPaymentType] = useState("hour");
  const [price, setPrice] = useState(0);

  function createService(e) {
    const token = localStorage.getItem("token");

    e.preventDefault();

    const service = {
      title,
      image,
      available: true,
      description,
      paymentType,
      price,
    };

    axios
      .post(`${serverUrl}/services/create`, service, {
        headers: {
          Authorization: token,
        },
      })
      .then((resp) => {
        navigate("/home");
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error);
      });
  }

  const handleKeyDown = (e) => {
    const keyCode = e.keyCode;

    if (
      (keyCode >= 48 && keyCode <= 57) ||
      (keyCode >= 96 && keyCode <= 105) ||
      keyCode === 8
    ) {
      if (keyCode === 8) {
        const newValue = Math.floor(parseFloat(price) / 10);
        setPrice(newValue.toFixed(2));
      } else {
        const digit = keyCode >= 96 ? keyCode - 96 : keyCode - 48;
        const newValue = parseFloat(price) * 10 + digit / 100;
        setPrice(newValue.toFixed(2));
      }
    } else {
      e.preventDefault();
    }
  };

  return (
    <SCContainer>
      <SCHeader>
        <Link to={"/home"}>
          <FaChevronLeft color="white" />
        </Link>
        <h1>Criar Serviço</h1>
        <div />
      </SCHeader>

      <form onSubmit={createService}>
        <input
          placeholder="título"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          placeholder="imagem"
          type="url"
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <textarea
          placeholder="descrição"
          onChange={(e) => setDescription(e.target.value)}
          rows="7"
          required
        />
        <strong>Como será cobrado seu trabalho?</strong>
        <SCSelectButtons>
          <label>
            <input
              type="radio"
              value="hour"
              checked={paymentType === "hour"}
              onChange={(e) => setPaymentType(e.target.value)}
            />
            Por hora
          </label>
          <label>
            <input
              type="radio"
              value="service"
              checked={paymentType === "service"}
              onChange={(e) => setPaymentType(e.target.value)}
            />
            Por serviço
          </label>
        </SCSelectButtons>
        <input
          type="text"
          value={price == 0 ? null : price}
          onKeyDown={handleKeyDown}
          placeholder={"preço"}
          readOnly
        />

        <SCButton type="submit">Criar</SCButton>
      </form>

      <BallOfLight />
    </SCContainer>
  );
}

const SCContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #0b0c0d;

  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-left: 28px;
  padding-right: 28px;

  form {
    box-sizing: border-box;
    margin-top: 60px;
    position: relative;
    z-index: 1;

    > strong {
      margin-top: 5px;
      display: flex;
      width: 100%;
      font-family: "Inter";
      color: #ffffff;
      font-size: 14px;
      justify-content: center;
    }

    > textarea {
      box-sizing: border-box;
      width: 100%;
      height: auto;
      border-radius: 8px;
      border: 1px solid #642cdc;
      background: #0b0811;
      margin-bottom: 10px;
      padding-left: 27px;
      padding-right: 27px;
      padding-top: 20px;
      padding-bottom: 20px;
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

const SCHeader = styled.div`
  margin-top: 40px;
  background: none;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;

  h1 {
    font-family: "Inter";
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    color: white;
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

const SCSelectButtons = styled.div`
  display: flex;
  color: white;
  align-items: center;
  justify-content: center;
  margin-top: 6px;
  margin-bottom: 12px;
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

const BallOfLight = styled.div`
  position: fixed;
  width: 415px;
  height: 424px;
  flex-shrink: 0;
  border-radius: 424px;
  background: #7a3cff;
  filter: blur(250px);
  right: -130px;
  top: 140px;
`;
