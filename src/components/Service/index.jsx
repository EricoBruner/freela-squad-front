import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

export default function Service({ service }) {
  const navigate = useNavigate();

  function openService(id) {
    navigate(`/services/${id}`);
  }

  return (
    <SCContainer>
      <h2>{service.freelancer.name}</h2>
      <strong>
        Preço médio
        <strong> R$ {service.price.toFixed(2)}</strong>
        {service.paymentType == "hour" ? " por hora" : " por serviço"}
      </strong>
      <div>
        <img src={service.image} />
        <div>
          <h1>{service.title}</h1>
          <SCButton onClick={() => openService(service.id)}>
            Ver mais...
          </SCButton>
        </div>
      </div>
    </SCContainer>
  );
}

const SCContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  font-family: Inter;
  border-radius: 8px;
  background-color: #0b0811;
  box-sizing: border-box;
  padding: 19px;

  > div {
    margin-top: 14px;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    gap: 24px;

    img {
      width: 50%;
      border-radius: 8px;
      object-fit: cover;
    }

    div {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      > h1 {
        color: #ded9e8;
        font-size: 12px;
        font-weight: 400;
      }
    }
  }

  > h2 {
    color: white;
    font-size: 14px;
    font-weight: 500;
  }

  > strong {
    margin-top: 16px;
    color: #6f6a79;
    font-size: 12px;
    font-weight: 400;

    > strong {
      color: #a57ff6;
      font-weight: 500;
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
