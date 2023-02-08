import React from 'react';
import '../../App.css';
import { ErrorStyled,
    LinkStyled, 
    H1, 
    H2, 
    LinkContainer } 
    from "./ErrorPageStyled";
import { FaFacebookSquare, 
    FaInstagram, 
    FaTiktok, 
    FaTwitterSquare } 
    from 'react-icons/fa'

export const ErrorPage = () => {
    return (
        <ErrorStyled>
            <H1>Page not found</H1>
            <LinkContainer>
                <img src="/images/logo.png" alt=""/>
                <LinkStyled to="/">Go to Home page</LinkStyled>
            </LinkContainer>
            <H2>You can find us on:</H2>
            <LinkContainer>          
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
            </LinkContainer>
        </ErrorStyled>
    )
}