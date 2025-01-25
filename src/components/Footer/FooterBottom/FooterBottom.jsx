import * as s from "./FooterBottom.styled";

const FooterBottom = () => {
  return (
    <s.Wrapper>
      <s.Item>© E-Pharmacy 2025. All Rights Reserved</s.Item>
      <s.Item>
        <a href="/privacy-policy">Privacy Policy</a>
      </s.Item>
      <s.Item>
        <a href="/terms-conditions">Terms & Conditions</a>
      </s.Item>
    </s.Wrapper>
  );
};

export default FooterBottom;
