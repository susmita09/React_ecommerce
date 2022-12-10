import React from "react";
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const Container = styled.div`
height : 35vh;
font-size: 20px;
margin-top: 2rem;
color: rgb(84, 84, 84);
display: flex;
flex-direction: column;
align-items: center;
 
`;

const StartShopping = styled.div`
  margin-top: 1rem;
   a {
  color: gray;
  text-decoration: none;
  display: flex;
  align-items: center;

  span {
    margin-left: 0.5rem;
  }
}
`

const CartEmpty = () => {
    return (
        <Container>
            <p>Your cart is currently empty</p>
            <StartShopping>
                <Link to="/">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-arrow-left"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fillRule="evenodd"
                            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                        />
                    </svg>
                    <span>Start Shopping</span>
                </Link>
            </StartShopping>
        </Container>
    )
}

export default CartEmpty;