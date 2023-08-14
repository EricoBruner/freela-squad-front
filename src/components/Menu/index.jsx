import { styled } from "styled-components";
import { HiMenu } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function Menu({ setOpenMenu }) {
  const userType = localStorage.getItem("userType");

  function Logoff() {
    localStorage.clear();
  }

  return (
    <>
      <SCContainer>
        <HiMenu
          onClick={() => setOpenMenu(false)}
          color="white"
          size={"24px"}
        />
        <nav>
          {userType == "freelancer" && (
            <>
              <Link to={"/services/create"}>
                <SCMenuItem>Criar serviço</SCMenuItem>
              </Link>
              <Link to={"/services/me"}>
                <SCMenuItem>Meus serviços</SCMenuItem>
              </Link>
            </>
          )}

          <Link onClick={() => Logoff()} to={"/"}>
            <SCExitMenuItem>Sair</SCExitMenuItem>
          </Link>
        </nav>
        <BallOfLight />
      </SCContainer>
      <SCCloseArea onClick={() => setOpenMenu(false)} />
    </>
  );
}

const SCContainer = styled.div`
  width: 70vw;
  height: 100vh;
  position: fixed;
  z-index: 10;
  display: flex;
  flex-direction: column;
  padding-top: 44px;
  padding-left: 28px;
  box-sizing: border-box;
  background: #0b0c0d;
  top: 0;
  right: 0;

  box-shadow: -5px 0px 5px rgba(0, 0, 0, 0.5);

  nav {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

const SCCloseArea = styled.div`
  width: 30vw;
  height: 100vh;
  position: fixed;
  z-index: 10;
  background: rgba(11, 8, 17, 0.7);
  top: 0;
  left: 0;
`;

const SCMenuItem = styled.a`
  font-family: "Inter";
  font-size: 18px;
  color: white;
  font-weight: 500;
  cursor: pointer;
`;

const BallOfLight = styled.div`
  position: fixed;
  width: 70vw;
  height: 70vw;
  flex-shrink: 0;
  border-radius: 346px;
  background: #7a3cff;
  filter: blur(200px);
  top: 30%;
  left: 50%;
  transform: translate(-20%, -20%);
`;

const SCExitMenuItem = styled.a`
  display: flex;
  margin-top: 25px;
  font-family: "Inter";
  font-size: 18px;
  color: white;
  font-weight: 800;
  cursor: pointer;
`;
