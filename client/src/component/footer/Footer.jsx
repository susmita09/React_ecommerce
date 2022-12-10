import React from "react";
import styled from '@emotion/styled';
import { EmailOutlined, Facebook, Instagram, Phone, Room, Twitter } from '@mui/icons-material';
import { mobile } from '../../responsive';

const Container = styled.div`
 display : flex;
 background-color : #29465B;
 color : white;
 
 ${mobile({ flexDirection: "column" })}
`;
const Left = styled.div`
 flex :1;
 display : flex;
 flex-direction : column;
 padding : 20px;
`;

const Logo = styled.h1`

`;

const Des = styled.p`
  margin : 20px 0px;

`;

const SocialContainer = styled.div`
    display : flex;
`;

const SocialIcon = styled.div`
   height : 40px;
   width : 40px;
   border-radius : 50%;
   color : white;
   background-color : #${props => props.color};
   display : flex;
   align-items : center;
   justify-content : center;
   margin-right : 20px;
`;

const Center = styled.div`
 flex : 1;
 padding : 20px;

`;
const Title = styled.h3`
  
 margin-bottom : 30px;

`;
const List = styled.ul`
  margin : 0;
  padding : 0;
  list-style : none;
  display : flex;
  flex-wrap : wrap;

`;

const ListItem = styled.li`
  width : 50%;
  margin-bottom : 10px;
  cursor : pointer;
`


const Right = styled.div`
 flex :1;
 padding : 20px;
`;
const ContactItem = styled.div`
 margin-bottom : 20px;
 display : flex;
 align-items : center;
`;
const Payment = styled.img``;



const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>ShopeeZy.</Logo>
                <Des>
                    If you would like to experience the best of online shopping for men,
                    women and kids in India, you are at the right place.ShopeeZy. is the
                    ultimate destination for fashion and lifestyle, being host to a wide
                    array of merchandise including clothing, footwear, and more.You can
                    shop online at ShopeeZy from the comfort of your home and get your
                    favourites delivered right to your doorstep.
                </Des>
                <SocialContainer>
                    <SocialIcon color="3B5999">
                        <Facebook />
                    </SocialIcon>
                    <SocialIcon color="E4405F">
                        <Instagram />
                    </SocialIcon>
                    <SocialIcon color="55ACEE">
                        <Twitter />
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>USEFUL LINKS</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Women Fashion</ListItem>
                    <ListItem>Men Fashion</ListItem>
                    <ListItem>Accessories</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Track Oder</ListItem>
                    <ListItem>WishList</ListItem>
                    <ListItem>Terms</ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem><Room style={{ marginRight: "30px" }} /> 622,Hyderabad Telengana, pin- 713408</ContactItem>
                <ContactItem><Phone style={{ marginRight: "30px" }} /> +91 64546484674</ContactItem>
                <ContactItem><EmailOutlined style={{ marginRight: "30px" }} /> abcd.ef3@shopeezy.com</ContactItem>
                <Payment src="" />
            </Right>

        </Container>
    )
}

export default Footer;