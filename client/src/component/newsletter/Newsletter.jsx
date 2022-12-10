import React from "react";
import styled from "@emotion/styled";
import { Send } from "@mui/icons-material";
import { mobile } from '../../responsive';

const Container = styled.div`
  height : 40vh;
  background-color : #fcf5f5;
  display : flex;
  flex-direction : column;
  align-items : center;
  justify-content : center;
`;
const Title = styled.h1`
 font-size : 60px;
 margin-bottom : 20px;
`;
const Description = styled.div`
  font-size : 20px;
  font-weight : 300;
  margin-bottom : 20px;
  ${mobile({ textAlign: "center" })}
`;
const InputContainer = styled.div`
 width : 50%;
 height : 40px;
 background-color : white;
 display : flex;
 justify-content : space-between;
 border : 1px solid gray;
 ${mobile({ width: "80%" })}
`;
const Input = styled.input` 
  border : none;
  flex : 8;
  padding-left : 20px;
`;
const Button = styled.button`
 flex: 1;
 border : none;
 background-color : teal;
 color : white;
`;

const NewsLetter = () => {
  return (
    <Container>
      <Title>NewsLetter</Title>
      <Description>Get Timely update of Latest deals and your favrouite products!</Description>
      <InputContainer>
        <Input placeholder="your email" />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  )
}

export default NewsLetter;