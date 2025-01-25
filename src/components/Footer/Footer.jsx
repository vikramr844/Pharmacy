import React from "react";
import { useMediaQuery } from "react-responsive";
import * as s from "./Footer.styled";
import FooterBottom from "./FooterBottom/FooterBottom";
import FooterLogo from "./FooterLogo/FooterLogo";
import FooterNavMenu from "./FooterNavMenu/FooterNavMenu";
import Social from "./Social/Social";

const Footer = () => {
  const desktop = useMediaQuery({ query: "(min-width: 1440px)" });

  return (
    <s.Wrapper id="footer">
      <s.FooterTop>
        <div>
          <FooterLogo />
          <s.Text>
            Get the medicine to help you feel better, get back to your active
            life, and enjoy every moment.
          </s.Text>
        </div>
        {desktop ? (
          <>
            <FooterNavMenu />
            <Social />
          </>
        ) : (
          <div>
            <FooterNavMenu />
            <Social />
          </div>
        )}
      </s.FooterTop>
      <FooterBottom />
    </s.Wrapper>
  );
};

export default Footer;
