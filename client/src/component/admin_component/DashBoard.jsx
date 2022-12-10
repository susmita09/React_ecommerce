import React from "react";
import styled from '@emotion/styled';
import { NavLink, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import  {Group,Shop,ViewList,ContentPaste} from '@mui/icons-material'

const DashBoardContainer = styled.div`
 height : 100Vh;
 display : flex;
`;

const SideNav = styled.div`
  border-right: 1px solid gray;
  height: calc(100vh - 70px);
  position: fixed;
  overflow-y: auto;
  width: 200px;
  display: flex;
  flex-direction: column;
  padding: 2rem;
   
  a {
  text-decoration: none;
  margin-bottom: 1rem;
  font-size: 16px;
  display : flex;
  align-items : center;
  font-weight: 700;
  }

  svg{
    margin-right : 0.5rem;
    font-size : 18px;
  }

 `;
const Title = styled.h3`
    margin: 0 0 1rem 0;
    padding: 0;
    text-transform: uppercase;
    font-size: 19px;
  `;

const Content = styled.div`
margin-left: 200px;
padding: 2rem 3rem;
width: 100%;
 
`;

const AccessDenied = styled.p`
 text-align : center;
 margin : 2rem;
 font-size : 2rem;
 color : red;
`

const DashBoard = () => {
    const user = useSelector((state) => state.auth);

    if (!user.isAdmin) return <AccessDenied>Access Denied you are not an admin</AccessDenied>
    return (
        <DashBoardContainer>
            <SideNav>
                <Title>Quick Links</Title>
                <NavLink
                    className={({ isActive }) =>
                        isActive ? "link-active" : "link-inactive"
                    }
                    to="/admin/summary"
                >
                    Summary
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        isActive ? "link-active" : "link-inactive"
                    }
                    to="/admin/products"
                >
                  <Shop/>  Product
                </NavLink>

                <NavLink
                    className={({ isActive }) =>
                        isActive ? "link-active" : "link-inactive"
                    }
                    to="/admin/users"
                >
                  <Group/>  Users
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        isActive ? "link-active" : "link-inactive"
                    }
                    to="/admin/orders"
                >
                <ContentPaste/>    Orders
                </NavLink>
            </SideNav>
            <Content>
                <Outlet />
            </Content>
        </DashBoardContainer>
    )
}

export default DashBoard