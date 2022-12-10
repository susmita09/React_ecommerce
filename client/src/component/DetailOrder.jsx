import React from 'react';
import styled from '@emotion/styled';
import NavBar from './navbar/Navbar';
import { useParams } from 'react-router-dom';
import { setHeaders } from '../redux/api';
import axios from 'axios';
import { useState, useEffect } from 'react';


const Wrapper = styled.div`
height:  calc(100vh - 60px);
 
display: flex;
align-items: center;
justify-content: center;
`;
const Container = styled.div`
background-color: white;
box-shadow: 0 3px 10px rgb(0 0 0 / 0.3);
 width: 40%;
 height : auto;

`;

const Pending = styled.span`
 color : yellow;
 padding : 3px 5px;
 border-radius : 5px;
 font-size : 14px;
 background : #e3e1da; 
`;
const Dispatched = styled.span`
padding : 3px 5px;
color : rgb(39,198,249);
background :#e3e1da;
border-radius : 5px;
 font-size : 14px;
`;
const Delivered = styled.span`
 color : rgb(102,108,255);
 background :#e3e1da;
 padding : 3px 5px;
 border-radius : 5px;
 font-size : 14px;
`;

const Items = styled.ul`
 
 span{
    margin-right : 1.5rem;
    &:first-child{
        font-weight : bold;
    }
 }
`;
const Item = styled.li`
 margin-left : 2rem;
 margin-bottom : 0.5rem;
`;
const OrderContainer = styled.div`
padding : 2rem;
display : flex;
flex-direction : column;


`;
const Address = styled.div`
 padding : 0.8rem;
 margin : 0.8rem;
 font-size : 20px;
  h3{
    color : blue;
  }
`;

const DetailOrder = () => {
    const params = useParams();

    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(false);
    console.log(order);
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:8000/api/orders/findone/${params.id}`, setHeaders());
                setOrder(res.data);
                setLoading(false);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchOrder();
    }, [params.id]);

    return (

        <>
            <NavBar />
            <Wrapper>
                <Container>
                    {loading ? (
                        <p>Loading.....</p>
                    ) :
                        <>
                            <OrderContainer>
                                <h2>Order Details</h2>
                                <p>
                                    Delivary status:{" "}
                                    {
                                        order.status === "pending" ? (
                                            <Pending>Pending</Pending>
                                        ) : order.status === "dispatched" ? (
                                            <Dispatched>Dispatched</Dispatched>
                                        ) : order.status === "delivered" ? (
                                            <Delivered>Delivered</Delivered>
                                        ) : ("error")}
                                </p>

                                <h3>Ordered Products</h3>
                                <Items>
                                    {order.products ? order.products.map((product, index) =>
                                    (<Item key={index}>
                                        <span>{product.description}</span>
                                        <span>Quantity : {product.quantity}</span>
                                        <span>{"RS. " + (product.amount_total / 100).toLocaleString()}</span>
                                    </Item>)
                                    ) : null}
                                </Items>
                                <div>
                                    <h3>Total Price : </h3>
                                    <p>{"Rs." + (order.total / 100).toLocaleString()}</p>
                                </div>
                                <Address>
                                    <h3>Shipping Details.</h3>
                                    <p>Coustomar Name. {order ? order.name : null}</p>
                                    <p>Email. {order.shipping ? order.shipping.email : null}</p>
                                    <p>Phone. {order.shipping ? order.shipping.phone : null}</p>
                                    <h5>Address. </h5>
                                    <p>City : {order.shipping ? order.shipping.address.city : null}</p>
                                    <span>State : {order.shipping ? order.shipping.address.state : null}</span>
                                </Address>
                            </OrderContainer>
                        </>
                    }
                </Container>
            </Wrapper>
        </>

    )
}

export default DetailOrder;