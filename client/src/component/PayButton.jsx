import React from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import { useSelector } from 'react-redux';


const Button = styled.button`
width: 100%;
padding: 10px;
background-color: black;
color: white;
font-weight: 600;
cursor : pointer;
`;

const PayButton = ({ cartItems, cartQuantity }) => {
    const auth = useSelector(state => state.auth);
    const handleCheckOut = () => {
        console.log(cartItems); 
        axios.post("http://localhost:8000/api/stripe/payment", {
            cartItems,
            cartQuantity,
            userId: auth.id

        }).then((response) => {
            if (response.data.url) {
                window.location.href = response.data.url; //redirect to the stripe url
            }
        }).catch((err) => console.log(err.message)); //if not an url show the error msg
    }
    return (
        <><Button onClick={() => handleCheckOut()}>Checkout Now</Button></>
    )
}

export default PayButton;