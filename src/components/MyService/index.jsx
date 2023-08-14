import axios from "axios";
import { styled } from "styled-components";

export default function MyService({ service, deleteService }) {
  function editService(id) {
    alert("Serviço de edição ainda não está disponivel!");
  }

  return (
    <SCContainer>
      <h2>{service.title}</h2>
      <div>
        <strong>
          Preço:<strong> R$ {service.price.toFixed(2)}</strong>
        </strong>
        <strong>
          Tipo:{" "}
          <strong>
            {service.paymentType == "service" ? "Por serviço" : "Por hora"}
          </strong>
        </strong>
      </div>
      <div>
        <img src={service.image} />
        <div>
          <h1>{service.description}</h1>
          <div>
            <SCEditButton onClick={() => editService(service.id)}>
              Editar
            </SCEditButton>
            <SCDeleteButton onClick={() => deleteService(service.id)}>
              Excluir
            </SCDeleteButton>
          </div>
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

    > div {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      > div {
        display: flex;
        gap: 5px;
      }

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

  > div > strong {
    margin-top: 5px;
    color: #6f6a79;
    font-size: 12px;
    font-weight: 400;

    > strong {
      color: #a57ff6;
      font-weight: 500;
    }
  }
`;

const SCEditButton = styled.button`
  width: 100%;
  height: 41px;
  border-radius: 8px;
  background: #a57ff6;
  border: none;
  margin-top: 100px;

  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  color: #fff;
`;

const SCDeleteButton = styled.button`
  width: 100%;
  height: 41px;
  border-radius: 8px;
  background: #da2c2c;
  border: none;
  margin-top: 100px;

  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  color: #fff;
`;
