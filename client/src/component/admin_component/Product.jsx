import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import styled from '@emotion/styled';



const ProductHeader = styled.div`
  display : flex;
  justify-content : space-between;
`;

const Button = styled.button`
 background-color : #002147;
 color : white;
 padding : 10px;
 cursor : pointer;
 font-size : 15px;
 border : none;
 border-radius : 3px;
 &:hover{
    background-color : #171412;
 }
`;

const Product = () => {

    const navigate = useNavigate();
   

    return (
        <>
            <ProductHeader>
                <h2>Products</h2>
                <Button onClick={() => navigate("/admin/products/create-product")}>Create Product</Button>
            </ProductHeader>

            <Outlet />
        </>

    )
}

export default Product;