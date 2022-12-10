import React from 'react';
import Announcement from '../component/Announcement';
import NavBar from '../component/navbar/Navbar';

import Category from '../component/category/Categories';
import Products from '../component/Products';
import NewsLetter from '../component/newsletter/Newsletter';
import Footer from '../component/footer/Footer';
import Banner from '../component/Banner';
import styled from '@emotion/styled';
 

const Component = styled.div`
padding : 18px 10px;
background : #F2F2F2;
`;

const Home = () => {
    return (
        <div>

            <NavBar />
            <Announcement />
            <Component>
                <Banner />
                <Category />
                
                <Products home={"home"} />
            </Component>

            <NewsLetter />
            <Footer />
        </div>
    )
}

export default Home