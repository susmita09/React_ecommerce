import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import {mobile} from '../../responsive';

const Container = styled.div`
  flex : 1;
  margin : 5px;
  height : 40vh;
  position : relative;
  transition: all 0.5s ease;
  &:hover {
   transform: scale(1.1);
  }
`;

const Image = styled.img`
 width : 100%;
 height : 90%;
 object-fit : cover;
 ${mobile({ height: "20vh" })}
`;
const Info = styled.div`
  position : absolute;
  width : 100%;
  height : 100%;
  top : 0;
  left : 0;
   
  display : flex;
  flex-direction : column;
  align-items : center;
  justify-content : center;
`;
const Title = styled.h2`
 color : white;
 margin-bottom : 20px;
`;
const Button = styled.button`
 border : none;
 padding : 10px;
 color : gray;
 background-color : white;
 font-weight : 600;
 cursor : pointer;
`;



const CategoryItem = ({ item }) => {
  return (

    <Container>
      <Link to={`/products/${item.cat}`}>
        <Image src={item.img} />
        <Info>
          <Title>{item.title}</Title>
          <Button>Shop Now</Button>
        </Info>
      </Link>

    </Container>

  )
}


export default CategoryItem;