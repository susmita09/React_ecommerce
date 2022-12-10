import React from 'react';
import styled from '@emotion/styled';
import { mobile } from '../responsive';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserOrder } from '../redux/actions/orderAction';
import NavBar from '../component/navbar/Navbar';



const Info = styled.div`
  width : 60%;
  margin : auto;

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



const OrderPage = () => {
    const { id } = useSelector(state => state.auth);
    const { userorder } = useSelector(state => state.userOrder);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserOrder(id));
    }, []);

    console.log(userorder)
    return (
        <div>
            <NavBar />
            <h3 style={{ textAlign: "center", margin: "2rem", }}>Your Orders</h3>
            {(userorder.length == 0) ? <p style={{ textAlign: "center", margin: "2rem", }}>you have not ordered yet</p>
                :
                (<Info>
                    {userorder.length > 0  && userorder.map(item => (
                        <Product key={item._id}>
                            <ProductDetails>

                                <Details>
                                    <ProductId>
                                        <b>ID:</b> {item._id}
                                    </ProductId>
                                    <ProductName>
                                        <b>Status:</b> {item.status}
                                    </ProductName>


                                    <ProductSize>
                                        <b>PaymentStatus:</b> {item.paymentStatus}
                                    </ProductSize>
                                </Details>
                            </ProductDetails>
                            <PriceDetails>
                                <ProductAmountContainer>

                                    <ProductAmount> <b>Price :</b> {item.total / 100}</ProductAmount>

                                </ProductAmountContainer>

                            </PriceDetails>

                        </Product>

                    ))
                    }
                </Info>)}
        </div>
    )
}

export default OrderPage;