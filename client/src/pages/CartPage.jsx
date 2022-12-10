import React from 'react';
import styled from '@emotion/styled';
import NavBar from '../component/navbar/Navbar';
import Footer from '../component/footer/Footer';
import { Add, Remove, ClearOutlined } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';
import { mobile } from '../responsive';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import PayButton from '../component/PayButton';
import { removeFromCart, increaseitemQuantity, decreaseitemQuantity } from '../redux/actions/cartActions';

import CartEmpty from '../component/Cart_Component/CartEmpty';


const Container = styled.div``;

const Wrapper = styled.div`
 padding : 20px;
 ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
 font-weight : 200;
 text-align : center;
`;

const Top = styled.div`
 display : flex;
 align-items : center;
 justify-content : space-between;
 padding : 20px;
 border-bottom : 1px solid #f2f2f2;
`;

const TopButton = styled.button`
 padding : 10px;
 font-weight : 600;
 cursor : pointer;
 border: ${(props) => props.type === "filled" && "none"};
 background-color: ${(props) =>
        props.type === "filled" ? "black" : "transparent"};
 color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
${mobile({ display: "none" })}
`;
const TopText = styled.span`
text-decoration: underline;
 cursor : pointer;
 margin : 0 5px;
 padding : 5px;
 color : purple;
`;

const Bottom = styled.div`
 display : flex;
 justify-content : space-between;
 ${mobile({ flexDirection: "column" })}
`;
const Info = styled.div`
 flex:3;
`;

const Product = styled.div`
 display : flex;
 justify-content : space-between;
 ${mobile({ flexDirection: "column" })}
`;

const ProductDetails = styled.div`
 margin : 5px;
 flex :3;
 display : flex;
`;
const Image = styled.img`
 width : 140px;
`;
const Details = styled.div`
 padding : 20px;
 margin : 20px;
 display : flex;
 flex-direction : column;
 justify-content : space-around;
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductColor = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  `;
const ProductSize = styled.span``;

const PriceDetails = styled.div`
  
 flex: 2;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 20px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 25px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;



const DeleteProduct = styled.div`
 flex: 1;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 `;
const Summary = styled.div`
 flex : 1;
 border : 0.5px solid black;
 border-radius : 10px;
 padding : 20px;
 height : 50vh;
`;

const SummaryTitle = styled.h1`
font-weight: 200;
`;

const SummaryItem = styled.div`
margin: 30px 0px;
display: flex;
justify-content: space-between;
font-weight: ${(props) => props.type === "total" && "500"};
font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;

const Button = styled.button`
width: 100%;
padding: 10px;
background-color: black;
color: white;
font-weight: 600;
cursor : pointer;
`;



const CartPage = () => {
    const cart = useSelector(state => state.cart);
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const clearCartItem = (item) => {
        dispatch(removeFromCart(item));
    }

    const increaseQuantity = (item) => {
        dispatch(increaseitemQuantity(item));
    }
    const decreaseQuantity = (item) => {
        dispatch(decreaseitemQuantity(item));
    }

    return (
        <Container>
            <NavBar />
            <Wrapper>
                <Title>Your Bag</Title>
                <Top>
                    <TopButton>continue shopping</TopButton>
                    <TopTexts>
                        <TopText>Shopping Bage({cart.cartQuantity})</TopText>
                        <TopText>Your wishList(0)</TopText>

                    </TopTexts>
                    {/* <TopButton type="filled">Checkout Now</TopButton> */}
                </Top>
                {cart.cartItems.length > 0 ? 
                
                <Bottom>



                    <Info>
                        {cart.cartItems.map(item => (
                            <Product key={item._id}>
                                <ProductDetails>
                                    <Image src={item.img[0].url} />
                                    <Details>
                                        <ProductName>
                                            <b>Product:</b> {item.title}
                                        </ProductName>
                                        <ProductId>
                                            <b>ID:</b> {item._id}
                                        </ProductId>
                                        <b>Color: </b> <ProductColor color={item.color} />
                                        <ProductSize>
                                            <b>Size:</b> {item.size}
                                        </ProductSize>
                                    </Details>
                                </ProductDetails>
                                <PriceDetails>
                                    <ProductAmountContainer>
                                        <Add onClick={() => increaseQuantity(item)} />
                                        <ProductAmount>{item.quantity}</ProductAmount>
                                        <Remove onClick={() => decreaseQuantity(item)} />
                                    </ProductAmountContainer>
                                    <ProductPrice>$ {item.price * item.quantity}</ProductPrice>
                                </PriceDetails>
                                <DeleteProduct>
                                    <Tooltip title="remove item">
                                        <ClearOutlined onClick={() => clearCartItem(item)} />
                                    </Tooltip>

                                </DeleteProduct>
                                <hr />
                            </Product>

                        ))
                        }
                    </Info>



                    {cart.cartItems.length > 0 && <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>{cart.cartTotal}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>$ {cart.cartTotal}</SummaryItemPrice>
                        </SummaryItem>
                        {auth.id ?
                            <PayButton cartItems={cart.cartItems} cartQuantity={cart.cartQuantity} />

                            : <Button onClick={() => navigate("/login")}>login to chrckout</Button>}

                    </Summary>
                    }
                </Bottom>
                    : <CartEmpty />
                }
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default CartPage