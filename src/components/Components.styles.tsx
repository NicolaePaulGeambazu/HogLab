import styled, { keyframes } from 'styled-components';
import Card from './Card';
import logoSidebar from '../assets/images/engineering.jpg';

export  const ButtonStyled  = styled.button`
  background-image: none;
  border: 1px solid transparent;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-left-color: transparent;
  border-radius: 10px;
  cursor: pointer;
  display: inline-block;
  margin-bottom: 0;
  min-height: 48px;
  padding: 12px 24px 10px;
  text-align: center;
  touch-action: manipulation;
  -webkit-user-select: none;
  -ms-user-select: none;
  -moz-user-select: none;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  font-weight: 600;
  background-color: #9fe870;
  color: #0e0f0c;
  font-size: 1rem;

  &:hover,
  &:active {
    background-color: #80e142;
  }

  &:focus {
    outline: none;
  }
`;

export const CardStyled = styled.div`
    background: white;
    box-shadow: 0 2px 8px var(--color-interactive-secondary);
    border-radius: 10px;
`;

export const Logo = styled.img`
    width: 100px;
    display: block;
    margin: 0 auto;
    padding: 64px 0;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
`;
export const CustomModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CustomModalContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  max-width: 400px;
  width: 80%;
`;

export const CustomModalHeader = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 20px;
`;

export const CustomModalTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0;
`;

export const CustomModalContent = styled.div`
  margin-bottom: 20px;
`;

export const CustomModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const WrapperUsers = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 10px;

@media (max-width: 1024px) {
  display: flex;
  flex-direction: column;
}
`;

export const LogoNavBar = styled.img`
  width: 50px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
`;

export const SidebarWrapper = styled.main`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
`;

export const CheckIfAccount = styled.p`
display: flex;
font-size: 0.7rem;
margin-left: 8px;
`;

export const Sidebar = styled.aside`
    display: none;
    position: sticky;
    width: 33%;
    overflow: hidden;
    background-color: #f8f8f8;
    background: url(${logoSidebar}) center;
    z-index: 0;
    flex-shrink: 0;

    /* Media query for smaller screens */
    @media (min-width: 768px) {
        display: block;
    }
`;

export const Elements = styled.section`
    width: 100%;
    display: flex;
    justify-content: center;
`;

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background: rgba(0, 0, 0, 0.75);
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 15px;
  padding-right: 15px;
`;

export const ModalContainer = styled(Card)`
  position: fixed;
  top: 30vh;
  left: 10%;
  width: 80%;
  z-index: 100;
  overflow: hidden;

  @media (min-width: 768px) {
    left: calc(50% - 20rem);
    width: 40rem;
  }
`;

export const Header = styled.header`
  background: var(--color-interactive-accent);
  padding: 1rem;
`;

export const Title = styled.h2`
  text-align: center;
  margin: 0;
  text-transform: capitalize;
`;

export const Content = styled.div`
  padding: 1rem;
`;

export const Actions = styled.footer`
  padding: 1rem;
  display: flex;
  justify-content: center;
`;

export const HeaderStyle = styled.header`
  padding: 10px 0;
  border: 1px solid #cdced9;
  height: 50px;
`;

export const ButtonUserDelete = styled.button`
    border: none;
    background: none;
    font-size: 21px;
`;

export const Wrapper = styled.div`
display: flex;
align-items: center;
`;

const rotatorAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
`;

const colorsAnimation = keyframes`
  0% {
    stroke: #4285f4;
  }
  25% {
    stroke: #de3e35;
  }
  50% {
    stroke: #f7c223;
  }
  75% {
    stroke: #1b9a59;
  }
  100% {
    stroke: #4285f4;
  }
`;

const dashAnimation = keyframes`
  0% {
    stroke-dashoffset: 187;
  }
  50% {
    stroke-dashoffset: 46.75;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: 187;
    transform: rotate(450deg);
  }
`;

export const Spinner = styled.div`
  animation: ${rotatorAnimation} 1.4s linear infinite;
`;

export const Path = styled.div`
  stroke-dasharray: 187;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: ${dashAnimation} 1.4s ease-in-out infinite, ${colorsAnimation} 5.6s ease-in-out infinite;
`;
export const Image = styled.img`
  width: 75px;
  height: 75px;
  border-radius: var(--radius-full);
  margin-right: 16px;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  &:hover {
    color: var(--color-content-secondary-hover);
  }
`;


export const AddButton = styled.div`
  display: flex;
  align-items: end;
  width: 98%;
  justify-content: end;
  padding-top: 10px;
  gap: 4px;
  cursor: pointer;
`;