import { useContext } from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContextWrapper";
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from '../../constants/constants';
import styled from 'styled-components';
import React from 'react';
import { FaFacebookSquare, 
        FaInstagram, 
        FaTiktok, 
        FaTwitterSquare } 
from 'react-icons/fa'

const NavContainer = styled.div`
    width: 100%;
    background: rgb(221,241,240);
    background: linear-gradient(0deg, rgba(221,241,240,0.9864320728291317) 47%, rgba(70,252,189,1) 100%);
    display: flex;
    flex-direction: column;
    justify-items: center;
`;
const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 100%;
    padding: 10px 40px;
    position: relative;
    z-index: 20;
`;
const StyledNavLink = styled(Link)`
    color: darkblue;
    font-weight: 600;
    font-size: 24px;
    line-height: 80px;
    text-decoration: none;
    margin-left:0;
`;
const H3 = styled.h3`
    color: darkblue;
    font-size: 24px;
    margin-left: 400px;
    margin-right: 0px;
`;
const Button2 = styled.button`
    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(11,221,46,1) 35%, rgba(0,212,255,1) 100%);
    border: 1px solid lightgrey;
    border-radius: 10px;
    box-sizing: border-box;
    box-shadow: 0 15px 15px rgb(0 42 177 / 15%);
    cursor: pointer;
    color: #fff;
    font-size: 20px;
    line-height: 15px;
    margin-left: 200px;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
`;
export const PageLayout = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    if (!user) {
        return <Navigate to="/login" />
    }

    const handleLogout = () => {
        localStorage.removeItem(LOCAL_STORAGE_JWT_TOKEN_KEY);
        setUser(null);
        navigate('/login');
    }

    return (
        <NavContainer>
                <Header>
                    <img src="/images/logo.png" alt="logo"/>
                    <StyledNavLink to= '/login'>Login</StyledNavLink>
                    <StyledNavLink to= '/register'>Register</StyledNavLink>
                    <H3>Find us on:</H3>
                    <a href="https://www.facebook.com">
                        <FaFacebookSquare /> 
                    </a>
                    <a href="https://www.instagram.com">
                        <FaInstagram />
                    </a>
                    <a href="https://www.tiktok.com">
                        <FaTiktok />
                    </a>
                    <a href="https://twitter.com">
                        <FaTwitterSquare />
                    </a>
                    <Button2 onClick={handleLogout}>Log out</Button2>
                </Header>
                <Outlet />
        </NavContainer>
    )
};
