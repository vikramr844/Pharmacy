import styled from "styled-components";

export const Wrapper = styled.footer`
  margin-top: 40px;
  padding: 20px;
  background-color: #28a745; /* Green color (replace with your desired color) */

  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 32px;
    margin-top: 60px;
  }

  @media screen and (min-width: 1440px) {
    padding: 40px 128px;
  }
`;

export const FooterTop = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const Text = styled.p`
  max-width: 261px;
  margin-bottom: 40px;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.28;
  color: #d3d3d3; /* Light grey color (replace with your desired color) */

  @media screen and (min-width: 768px) {
    margin-bottom: 88px;
    font-size: 16px;
    line-height: 1.25;
  }

  @media screen and (min-width: 1440px) {
    margin-bottom: 64px;
  }
`;
