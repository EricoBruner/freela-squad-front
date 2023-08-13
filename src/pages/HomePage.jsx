import { styled } from "styled-components";
import Header from "../components/Header";

export default function HomePage() {
  return (
    <SCContainer>
      <Header />
      <h1>Eripin</h1>

      <BallOfLight />
    </SCContainer>
  );
}

const SCContainer = styled.div`
  background-color: #0b0c0d;
  width: 100vw;
  height: 100vh;
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
