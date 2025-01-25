import styled from "styled-components";

export const Wrapper = styled.ul`
  display: none;

  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }
`;

export const Item = styled.li`
  display: flex;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 8px;
  border-radius: 10px;
  transition: all 0.3s;
  border: 1px solid rgba(247, 248, 250, 0.1);

  &:hover {
    border: 1px solid rgba(247, 248, 250, 0.5);
  }
`;
