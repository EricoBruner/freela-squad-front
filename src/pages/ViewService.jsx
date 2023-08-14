import axios from "axios";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { styled } from "styled-components";

export default function ViewService() {
  const { id } = useParams();
  const serverUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const [service, setService] = useState([]);

  useEffect(() => {
    axios
      .get(`${serverUrl}/services/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(({ data: service }) => {
        setService(service);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }, []);

  if (service.length == 0) {
    return (
      <SCContainer>
        <SCHeader>
          <Link to={"/home"}>
            <FaChevronLeft color="white" />
          </Link>
          <h1>Carregando...</h1>
          <div />
        </SCHeader>
        <BallOfLight />
      </SCContainer>
    );
  }

  return (
    <SCContainer>
      <>
        <SCHeader>
          <Link to={"/home"}>
            <FaChevronLeft color="white" />
          </Link>
          <h1>{service.freelancer.name}</h1>
          <div />
        </SCHeader>

        <img src={service.image} alt={service.title} />

        <h1>{service.title}</h1>
        <p>{service.description}</p>
        <strong>
          Preço médio
          <strong> R$ {service.price.toFixed(2)}</strong>
          {service.paymentType == "hour" ? " por hora" : " por serviço"}
        </strong>
        <hr />
        <nav>
          <h2>Telefone</h2>
          <a href="">{service.freelancer.phone}</a>
        </nav>
        <nav>
          <h2>Email</h2>
          <a href="">{service.freelancer.email}</a>
        </nav>
        <nav>
          <h2>Cidade</h2>
          <a href="">
            {service.freelancer.cityName} - {service.freelancer.stateAcronym}
          </a>
        </nav>
        <BallOfLight />
      </>
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
  font-family: Inter;
  color: white;

  > img {
    position: relative;
    z-index: 2;
    margin-top: 42px;
    height: 250px;
    width: auto;
    object-fit: contain;
  }

  > h1 {
    position: relative;
    z-index: 2;
    margin-top: 42px;
    font-size: 18px;
    font-weight: 500;
  }

  > p {
    position: relative;
    z-index: 2;
    margin-top: 13px;
    color: #ded9e8;
    text-align: justify;
    font-size: 14px;
    font-weight: 400;
  }

  > strong {
    position: relative;
    z-index: 2;
    margin-top: 16px;
    color: #ded9e8;
    font-size: 14px;
    font-weight: 400;

    > strong {
      color: #a57ff6;
      font-weight: 500;
    }
  }

  > hr {
    position: relative;
    z-index: 2;
    margin-top: 28px;
    margin-bottom: 28px;
    width: 100%;
    height: 1px;
    background: #575757;
    border: none;
  }

  > nav {
    position: relative;
    z-index: 1;
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 15px;

    h2 {
      font-size: 14px;
      font-weight: 500;
    }

    a {
      display: flex;
      width: auto;
      height: 20px;
      box-sizing: border-box;
      padding: 12px;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      background: #642cda;
      color: white;
      font-size: 14px;
      font-weight: 500;
    }
  }
`;

const SCHeader = styled.header`
  position: relative;
  z-index: 1;
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

const BallOfLight = styled.div`
  position: fixed;
  width: 338px;
  height: 346px;
  flex-shrink: 0;
  border-radius: 346px;
  background: #7a3cff;
  filter: blur(250px);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
