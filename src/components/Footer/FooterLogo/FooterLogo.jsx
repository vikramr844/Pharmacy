import * as s from "./FooterLogo.styled";
import logo from "/brandLogo.jpg";

const FooterLogo = () => {
  return (
    <s.Wrapper href="/">
      <s.Img src={logo} alt="logo" loading="lazy" />
      <s.Text>E-Pharmacy</s.Text>
    </s.Wrapper>
  );
};

export default FooterLogo;
