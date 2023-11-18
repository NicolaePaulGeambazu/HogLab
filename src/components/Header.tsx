import { Logo } from "./Components.styles";

const logo = require("../assets/images/engineering-logo.jpeg");

const Header = () => {
  return (
    <header>
      <Logo src={logo} alt="engineer logo"/>
    </header>
  );
};

export default Header;