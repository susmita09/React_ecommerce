import React from "react";
import styled from "@emotion/styled";
import { useEffect } from "react";
import { useState } from "react";
import Card from "./Card";
import { mobile } from '../responsive';
import CircularProgress from '@mui/material/CircularProgress';


import { getProducts } from "../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  padding : 25px;
  display : flex;
  flex-wrap : wrap;
  justify-content: space-between;
  align-items : center;
  
  
`;

const Loading = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin : 40px 0;
`;
const Title = styled.h1`
  text-align : center;
  margin-top : 2rem;
  font-size: 40px;
  text-transform: uppercase;
  background: linear-gradient(to right, #30CFD0 0%, #330867 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  ${mobile({ fontSize: "20px" })}
`
const Products = ({ category, filters, sort , home}) => {

    const prodState = useSelector(state => state.getProducts); //{products : [{},{}]}
    let prod = [];
    const { products, status, catProduct } = prodState;
    prod = products;

    const [filterProducts, setFilteredProducts] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts(category,home));
    }, [category])




    useEffect(() => {
        category && setFilteredProducts(
            catProduct.filter((item) =>
                Object.entries(filters).every(([key, value]) =>
                    item[key].includes(value)
                )))
    }, [prod, filters, catProduct]);

    //sorting product
    useEffect(() => {
        if (sort === "newest") {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => a.createdAt - b.createdAt)
            );
        } else if (sort === "asc") {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => a.price - b.price)
            );
        } else {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => b.price - a.price)
            );
        }
    }, [sort]);


    return (
        <>
            <Title>Sizzling Deals</Title>
            {status === "fail" ? <Loading >
                <CircularProgress color="secondary" />

            </Loading> :
                <Container>



                    {category ? (
                        filterProducts.map((item) => (
                            <Card key={item._id} item={item} />
                        ))
                    ) :
                        products.map((item) => (
                            <Card key={item._id} item={item} />
                        ))
                    }
                </Container>
            }
        </>

        // <>hi</>

    )
}

export default Products;