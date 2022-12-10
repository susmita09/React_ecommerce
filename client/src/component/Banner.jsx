import React from 'react';
import styled from '@emotion/styled';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { sliderItems } from '../data';

const responsive = {

    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};


const Slide = styled.div`
  width: 100%;
  height: 70vh;
   
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
 
`;
const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
`;
const Title = styled.h1`
  font-size: 30px;
`;
const Description = styled.p`
  margin: 50px 0px;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 3px;
`;
const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
  &:hover{
    background-color : black;
    color : white
  }
`;


const Banner = () => {
    return (
        <Carousel
            swipeable={false}
            draggable={false}
            showDots={true}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            responsive={responsive}>
            {sliderItems.map(item => (
                <Slide bg={item.bg} key={item.id}>
                    <ImgContainer>
                        <Image src={item.img} />
                    </ImgContainer>
                    <InfoContainer>
                        <Title>{item.title}</Title>
                        <Description>{item.desc}</Description>
                        <Button>Shop Now</Button>
                    </InfoContainer>
                </Slide>
            ))}
        </Carousel>
    )
}

export default Banner;