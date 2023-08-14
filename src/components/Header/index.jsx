import { styled } from "styled-components";
import { HiMenu } from "react-icons/hi";
import logoNameImage from "../../assets/logo-name.svg";
import { useState } from "react";
import Menu from "../Menu";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <SCContainer>
      <img src={logoNameImage} alt="logo" />
      <HiMenu size={"24px"} onClick={() => setOpenMenu(true)} color="white" />
      {openMenu && <Menu setOpenMenu={setOpenMenu} />}
    </SCContainer>
  );
}

const SCContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  padding-top: 44px;

  img {
    width: 178px;
  }
`;
