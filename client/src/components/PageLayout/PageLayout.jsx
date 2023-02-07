import { useContext } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContextWrapper";
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from '../../constants/constants';
import styled from 'styled-components';
import React from 'react';
//import {Container} from 'react-bootstrap'
//import 'bootstrap/dist/css/bootstrap.min.css'
//import '../css/custom.css'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import {faFacebook} from '@fortawesome/free-brands-svg-icons'


const NavContainer = styled.div`
    width: 100%;
    height: 100%;
    z-index: 20;
    background: rgb(221,241,240);
    background: linear-gradient(0deg, rgba(221,241,240,0.9864320728291317) 47%, rgba(70,252,189,1) 100%);
    display: flex;
    flex-direction: column;
    justify-content: space-space-between;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-space-between;
    height: 100%;
    width: 1200px;
    padding: 10px 40px;
    position: relative;
    z-index: 20;
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
    margin: 20px;
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
                    <Button2 onClick={handleLogout}>Log out</Button2>
                </Header>
                <Outlet />
        </NavContainer>
    )
};
