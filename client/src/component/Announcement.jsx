import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  height: 20px;
  background-color: #B99750;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 600;
`;

const Announcement = () => {
  return (
    <Container>
      Super Savings Offer! Free shipping on order above $50.
    </Container>
  );
};

export default Announcement;
