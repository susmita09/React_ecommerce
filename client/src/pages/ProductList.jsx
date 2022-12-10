import React from 'react';
import styled from '@emotion/styled';
import NavBar from '../component/navbar/Navbar';
import Announcement from '../component/Announcement';
import Products from '../component/Products';
import Footer from '../component/footer/Footer';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { mobile } from '../responsive'


const Container = styled.div`
`;
const Title = styled.h1`
margin : 20px;
`;

const FilterContainer = styled.div`
 display : flex;
 justify-content : space-between;
  
`;

const Filter = styled.div`
margin : 20px;
${mobile({ margin: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
font-size : 20px;
font-weight : 600;
margin-right : 15px;
`;

const Select = styled.select`
padding : 9px;
margin-right : 20px;
${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;
// background-color :${(props) => props.color};
const Button = styled.button`
background-color: CORAL; 
border: none;
color: white;
padding: 5px ;
text-align: center;
 
display: inline-block;
font-size: 15px;
margin: 4px 2px;
cursor: pointer;
`;

const ProductList = () => {
    const location = useLocation();
    const category = location.pathname.split("/")[2];

    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState("newest");

    const handleFilters = (e) => {
        const value = e.target.value;
        setFilters({
            ...filters,
            [e.target.name]: value
        })
    }

    const handleReset = (e) => {
        setFilters({});
        setSort("newest");
    }

    return (
        <Container>
            <NavBar />
            <Announcement />
            <Title>{category.toUpperCase()}</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter Product :</FilterText>
                    <Select name="color" onChange={handleFilters}>
                        <Option value="">color</Option>
                        <Option value="white" >white</Option>
                        <Option value="black">black</Option>
                        <Option value="red">red</Option>
                        <Option value="green" >green</Option>
                        <Option value="yellow">yellow</Option>
                    </Select>
                    <Select name="size" onChange={handleFilters}>
                        <Option value="">Size</Option>
                        <Option value="S">S</Option>
                        <Option value="XS">XS</Option>
                        <Option value="M" >M</Option>
                        <Option value="L">L</Option>
                        <Option value="XL">XL</Option>
                    </Select>
                </Filter>
                <Button onClick={handleReset}>Reset Filter</Button>
                <Filter>
                    <FilterText>Sort Products:</FilterText>
                    <Select onChange={e => setSort(e.target.value)}>
                        <Option value="">Price</Option>
                        <Option value="newest">Newest</Option>
                        <Option value="asc">Price(asc)</Option>
                        <Option value="desc">Price(desc)</Option>
                    </Select>
                </Filter>
            </FilterContainer>
           
            <Products category={category} filters={filters} sort={sort} />
            <Footer />
        </Container>
    )
}

export default ProductList;