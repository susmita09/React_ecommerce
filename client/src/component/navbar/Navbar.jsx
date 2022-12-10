import React from "react";
import { useState } from 'react';
import styled from "@emotion/styled";
import { Badge } from "@mui/material";
import { Favorite, Search, ShoppingCartOutlined, Menu } from "@mui/icons-material";
import Tooltip from '@mui/material/Tooltip';
import { toast } from 'react-toastify';
import BasicMenu from "./BasicMenu";
import { css } from '@emotion/react'


import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { mobile, tab } from '../../responsive';
import { signOut } from "../../redux/actions/authActions";


const Container = styled.div`
  color : black; 
  height: 60px;
  background : #f0f0f0;
  
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
 
width : 100%;
z-index : 1;
position : fixed;
top : 0;
overflow : hidden;
color : black;
padding: 10px 20px;
display: flex;
align-items: center;
justify-content : space-between;
   
  ${mobile({ padding: "10px 0px", backgroundColor: "black", color: "white" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  flex : 2;
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  
  margin-left: 27px;
  flex-direction : column;
  padding: 5px;
  background : white;
  border-radius: 20px;
  color : black;
  ${mobile({ marginLeft: "5px", marginRight: "9px", width: "100%" })}
`;
const SearchInput = styled.div`
  width : 100%;
  display : flex;
`;
const Input = styled.input`
  border: none;
  outline : none;
  padding : 5px;
  width : 100%;

  ${mobile({ width: "90%" })}
`;

const ListContainer = styled.ul`
 border : 2px solid black;
 width : 100%;
`;
const List = styled.li`
list-style: none;
line-height :20px;
font-size : 20px;
margin : 5px;
font-weight : bold;
padding : 10px;
cursor : pointer;
`;

const SearchDropdown = styled.ul`
  position: absolute;
  width: 28%;
  max-width : 90%;
  min-width : 28%;
  height: 300px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 0.5px solid #D3D3D3;
  background : white;
  border-radius: 20px;
  color : black;
  top: 55px;
  left: 70px;
  z-index: 5;
  overflow: auto
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;
const Logo = styled.h2`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  
  
`;


const MenuItem = styled.div`
  font-size: 16px;
  margin-left: 25px;
  cursor: pointer;
  color : white;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const ResMenu = styled.div`
  font-size: 16px;
  margin-left: 25px;
  cursor: pointer;
  color : white;
  display : none;
  ${tab({ display: "block" })}
`;
// ${mobile({ flex: 2, justifyContent: "center" })}
const NavBar = () => {

  const quantity = useSelector((state) => state.cart.cartQuantity);
  const auth = useSelector((state) => state.auth);
  const productState = useSelector(state => state.getProducts);
  const products = productState.products;

  const { count } = useSelector((state) => state.wish);



  const dispatch = useDispatch();


  //handle logout
  const handleLogOut = () => {
    dispatch(signOut());
    toast.warning("logout succeassfull !", {
      position: "top-right"
    });
  }

  const [text, setText] = useState("");

  const getText = (text) => {
    setText(text);
  }


  return (
    <>
      <Container>
        <Wrapper>

          <Left>

            {/* <SearchBox products={productState.products}/> */}
            <SearchContainer>
              <SearchInput>
                <Input placeholder="search product" onChange={(e) => getText(e.target.value)} />
                <Tooltip title="search">
                  <Search
                    style={{ color: "gray", fontSize: 30, }}
                  />
                </Tooltip>
              </SearchInput>
            </SearchContainer>
          </Left>

          <Center>
            <Link to="/" style={{ textDecoration: 'none', color: "inherit" }}>
              <Logo>ShopeeZy.</Logo>
            </Link>
          </Center>

          <Right>
            {/* <MenuItem onClick={handleLogOut}> Logout </MenuItem> */}

            {auth.id ? <>
              <BasicMenu handleLogOut={handleLogOut} name={auth.name} />

              {auth.isAdmin ? (<MenuItem><Link to="/admin/summary"
                style={{ textDecoration: 'none', color: "white" }}>Admin</Link></MenuItem>) : null}
            </> :

              <>
                <MenuItem><Link to="/register" style={{ textDecoration: 'none', color: "white" }}>SIGN UP </Link></MenuItem>
                <MenuItem><Link to="/login" style={{ textDecoration: 'none' }}>SIGN IN</Link></MenuItem>
              </>
            }





            <MenuItem>
              <Tooltip title="cart">
                <Link to="/cart" style={{ textDecoration: 'none', color: "white" }}>
                  <Badge badgeContent={quantity} color="primary">
                    <ShoppingCartOutlined />
                  </Badge>
                </Link>
              </Tooltip>
            </MenuItem>

            <MenuItem>
              <Tooltip title="wishlist">
                <Link to="/wishlist" style={{ textDecoration: 'none', color: "white" }}>
                  <Badge badgeContent={count} color="primary">
                    <Favorite sx={{ fontSize: "24px" }} />
                  </Badge>
                </Link>
              </Tooltip>
            </MenuItem>


          </Right>

        </Wrapper>
      </Container>

      {
        text &&
        <SearchDropdown>

          {
            products.filter(product => product.title.toLowerCase().includes(text.toLowerCase()))
              .map(product => (
                <>

                  <List key={product._id}><Link to={`/product/${product._id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  ><Search />  {product.title}</Link></List>
                  <hr />
                </>
              ))
          }


        </SearchDropdown>
      }
    </>

  );
};

export default NavBar;
