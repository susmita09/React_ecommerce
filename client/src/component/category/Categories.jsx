import React from "react";
import styled from "@emotion/styled";
import { categories } from "../../data";
import CategoryItem from "./CategoryItem";
import { mobile } from '../../responsive';

const Container = styled.div`
 display : flex;
 margin : 10px;
 padding : 20px;
 justify-content : space-between;
 transition: all 0.5s ease;
 ${mobile({ padding: "0px", flexDirection : "column" })}
`;

const Title = styled.h1`
  text-align : center;
  margin-top : 20px;
  font-size: 50px;
  text-transform: uppercase;
  background: linear-gradient(to right, #30CFD0 0%, #330867 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  ${mobile({fontSize : "20px" })}
`

const Category = () => {
    return (
        <>
            <Title>SHOP BY CATEGORY</Title>

            <Container>
                {categories.map((item) => (
                    <CategoryItem item={item} key={item.id} />
                ))}
            </Container>
        </>
    )
}

export default Category;