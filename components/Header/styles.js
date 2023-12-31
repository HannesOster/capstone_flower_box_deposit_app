import styled from "styled-components";
import Image from "next/image";
import { HiUser } from "react-icons/hi";

export const StyledHeader = styled.header`
  background-color: ${(props) => props.theme.primary};
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;
export const StyledLogo = styled(Image)`
  border-radius: 5px;
  background-color: ${(props) => props.theme.third};
`;
export const LogInButton = styled.button`
  position: fixed;
  top: 10px;
  right: 20px;
  padding: 0px 5px;
  border: 3px ${(props) => props.theme.third} solid;
  font-size: 18px;
  border-radius: 5px;
  color: ${(props) => props.theme.third};
  background-color: ${(props) => props.theme.primary};
`;
export const SessionInfo = styled.p`
  color: ${(props) => props.theme.third};
  font-size: 20px;
`;
export const LogOutContainer = styled.div`
  display: flex;
  width: auto;
  gap: 20px;
`;

export const UserIcon = styled(HiUser)`
  font-size: 25px;
  transform: translate(-2px, 4px);
`;
