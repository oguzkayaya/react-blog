import React from "react";
import styled from "styled-components";

function Footer() {
  return <FooterContainer>Footer</FooterContainer>;
}

export default Footer;

const FooterContainer = styled.footer`
  color: #bbb;
  background: var(--dark-color);
  height: 56px;
  width: 100%;
  position: absolute;
  bottom: 0;
  padding: 10px;
`;
