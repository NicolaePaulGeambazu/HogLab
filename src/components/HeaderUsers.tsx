import { Container, HeaderStyle, LogoNavBar  } from "./Components.styles";
import Menu from "./Menu";

const logo = require("../assets/images/engineering-logo.jpeg");

const HeaderWMenu= () => {
  return (
    <HeaderStyle>
      <Container>
        <LogoNavBar src={logo} alt="Engineer logo" />
        <Menu />
      </Container>
    </HeaderStyle>
  );
};

export default HeaderWMenu;
