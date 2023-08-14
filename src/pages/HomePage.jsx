import { styled } from "styled-components";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import Service from "../components/Service";

export default function HomePage() {
  const serverUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get(`${serverUrl}/services`, {
        headers: {
          Authorization: token,
        },
      })
      .then(({ data: arrayServices }) => {
        setServices(arrayServices);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }, []);

  return (
    <SCContainer>
      <Header />

      <h1>Recentes</h1>

      <ScrollableContainer>
        <SCServicesContainer>
          {services.map((service) => (
            <Service key={service.id} service={service} />
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
  height: auto;
  box-sizing: border-box;
  padding-left: 28px;
  padding-right: 28px;
  padding-bottom: 200px;

  > h1 {
    margin-top: 40px;
    font-family: Inter;
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
