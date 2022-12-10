import React from 'react';
import styled from '@emotion/styled';
 
import Footer from '../component/footer/Footer'
import NavBar from '../component/navbar/Navbar';
import { Add, Remove, } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { mobile } from '../responsive';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../redux/actions/productActions';
import { addToCart } from '../redux/actions/cartActions';

const Container = styled.div`
 background-color : #F2F2F2;
`;
const Wrapper = styled.div`
 padding : 50px;
 display : flex;
 background-color : white;
 width : 95%;
 margin: 5px auto;
 ${mobile({ padding: "20px", flexDirection: "column" })}
 
`;
const ImageContainer = styled.div`
flex : 1;
`;

const Image = styled.img`
 width : 100%;
 height : 60vh;
 object-fit : contain;
 border : 1px solid #f0f0f0;
 ${mobile({ width: "40vh" })}
`;

const InfoContainer = styled.div`
 flex : 1;
 padding : 0px 50px;
 ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight : 200;
`;
const Desc = styled.p`
 margin : 20px 0px;
`;
const Price = styled.span`
font-weight : 100;
font-size : 40px;
`;

const FilterContainer = styled.div`
  width : 50%;
  margin : 30px 0px;
  display : flex;
  justify-content : space-between;
  ${mobile({ width: "100%" })}
`;
const Filter = styled.div`
  display : flex;
  align-item : center;
`;
const FilterTitle = styled.span`
font-size : 20px;
font-weight : 150;
margin-right : 5px;
`;
const FilterColor = styled.span`
 width : 20px;
 height : 20px;
 border-radius : 50%;
 background-color :${(props) => props.color};    
 margin : 0px 5px;
 cursor : pointer;
  
`;
// 
const FilterSize = styled.select`
 margin-left : 10px;
 padding : 5px;
 color : purple;
`;
const FilterSizeOption = styled.option`
 color : purple;
`;

const AddContainer = styled.div`
 width : 70%;
 display : flex;
 align-items : center;
 justify-content : space-between;
 ${mobile({ width: "100%", flexDirection : "column" })}
`;
const QuantityContainer = styled.div`
display : flex;
align-items : center;
font-weight : 700;
margin : 0.8rem;
`;
const Quantity = styled.span`
 width : 30px;
 height : 30px;
 border-radius: 10px;
 border : 1px solid black;
 display : flex;
 align-items : center;
 justify-content : center;
 margin : 8px 10px;
`;
const StyleButton = styled.button`
 width : 250px;
 height : 50px;
 border-radius : 2px;
 margin-top : 20px;
 margin-right: 10px;
 background: #29465B;
 color : white;
 border : none;
 &:hover{
    background-color : black;
   
  }
`;

// const QuantityT = styled.p`

// `;


const Detailproduct = () => {
    // const location = useLocation();
    // const prodId = location.pathname.split("/")[2];

    const { id } = useParams(); //it returns an object with all parater variable destructure the id varialbel

    const { loading, product } = useSelector(state => state.getProductDetails);


    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");

    
     const nevigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductDetails(id));
    }, [id, dispatch])

    const handleColor = (c) =>{
        setColor(c);
       
    };
    const handleQuantity = (type) => {
        if (type === "dec") {
            quantity > 1 && setQuantity(quantity - 1);
        }
        else {
            setQuantity(quantity + 1);
        }
    }

    //handle cart button
    const handleClick = () => {
        dispatch(addToCart({ ...product, quantity, color, size }));
        toast.success("product added", { position: "top-right" });
    }

    const handleBuy = ()=>{
        dispatch(addToCart({ ...product, quantity, color, size }));
        nevigate("/cart");
    }

    return (
        <Container>
            <NavBar />
            
            {product && Object.keys(product).length &&
                <Wrapper>
                    <ImageContainer>
                        <Image src={product.img[0].url} />
                    </ImageContainer>
                   
                    <InfoContainer>
                        <h2>{product.cat}</h2> 
                        <Title>{product.title}</Title>
                        <Desc>{product.des},  Id : {product._id}</Desc>
                        <Price>₹ {product.price}</Price>
                        <FilterContainer>
                            <Filter>
                                <FilterTitle>Color </FilterTitle>
                                {product.color.map((c) =>
                                    (<FilterColor color={c} key={c} onClick={() => handleColor(c)} />)
                                )}
                            </Filter>
                            <Filter>
                                <FilterTitle>Size</FilterTitle>
                                <FilterSize onChange={(e) => setSize(e.target.value)}>
                                    <FilterSizeOption value="">size</FilterSizeOption>
                                    {product.size.map((s) =>
                                        (<FilterSizeOption key={s} >{s}</FilterSizeOption>)
                                    )}
                                </FilterSize>
                            </Filter>
                        </FilterContainer>
                        <AddContainer>
                            <p>Quantity</p>

                            <QuantityContainer>

                                <Remove onClick={() => handleQuantity("dec")} />
                                <Quantity>{quantity}</Quantity>
                                <Add onClick={() => handleQuantity("inc")} />
                            </QuantityContainer>
                            <StyleButton onClick={handleClick}>Add TO Cart</StyleButton>
                            <StyleButton onClick={handleBuy}>BuyNow</StyleButton>
                        </AddContainer>
                    </InfoContainer>
                </Wrapper>}

            <Footer />
        </Container>
    )
}

export default Detailproduct;