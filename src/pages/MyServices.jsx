import { styled } from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import MyService from "../components/MyService";
import sadEmojeImage from "../assets/icon-sad.png";

export default function MyServices() {
  const serverUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const [services, setService] = useState([]);

  function deleteService(id) {
    const confirmed = window.confirm(
      "Tem certeza que deseja deletar este serviço?"
    );

    if (confirmed) {
      axios
        .delete(`${serverUrl}/services/${id}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((resp) => {})
        .catch((error) => {
          alert(error.response.data.message);
        });
    }
  }

  useEffect(() => {
    axios
      .get(`${serverUrl}/services/me`, {
        headers: {
          Authorization: token,
        },
      })
      .then(({ data: services }) => {
        setService(services);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }, [deleteService]);

  return (
    <SCContainer>
      <SCHeader>
        <Link to={"/home"}>
          <FaChevronLeft color="white" />
        </Link>
        <h1>Meus Serviços</h1>
        <div />
      </SCHeader>

      {services.length == 0 && (
        <>
          <h1>Você não possui nenhum serviço!</h1>
          <SCIcon>
            <img src={sadEmojeImage} />
          </SCIcon>
        </>
      )}

      <ScrollableContainer>
        <SCServicesContainer>
          {services.map((service) => (
            <MyService
              key={service.id}
              service={service}
              deleteService={deleteService}
            />
          ))}
        </SCServicesContainer>
      </ScrollableContainer>

      <BallOfLight />
    </SCContainer>
  );
}

const SCContainer = styled.div`
  background-color: #0b0c0d;
  width: 100vw;
  min-height: 100vh;
  box-sizing: border-box;
  padding-left: 28px;
  padding-right: 28px;
  padding-bottom: 200px;

  > h1 {
    width: 100%;
    text-align: center;
    padding-top: 50px;
    font-family: "Inter";
    font-size: 18px;
    font-weight: 400;
    color: white;
  }
`;

const SCHeader = styled.header`
  position: relative;
  z-index: 1;
  padding-top: 40px;
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

const BallOfLight = styled.section`
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

const SCIcon = styled.div`
  width: 100%;
  display: flex;
  margin-top: 30px;
  align-items: center;
  justify-content: center;
  height: 50px;
`;

const SCServicesContainer = styled.div`
  margin-top: 22px;
  display: flex;
  height: auto;
  flex-direction: column;
  gap: 19px;
  position: relative;
  z-index: 1;
`;

const ScrollableContainer = styled.div`
  overflow-y: auto;
  flex: 1;
`;
