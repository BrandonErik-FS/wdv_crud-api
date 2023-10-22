import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import AuthService from '../services/authService';

const Header = (props) => {
    return (
        <HeaderStyled>
            <Link to={props.linkTo}>
                <ImageStyled
                    src={props.logoSrc}
                    alt={props.logoAlt}
                    width={props.logoWidth}
                    height={props.logoHeight}
                />
            </Link>
            {props.loggedIn ? (
                <LogOutButton onClick={AuthService.logout}>
                    Log Out
                </LogOutButton>
            ) : (
                <DivStyled>
                    <LinkStyled to='/login'>Log In</LinkStyled>
                    <LinkStyled to='/signup'>Sign Up</LinkStyled>
                </DivStyled>
            )}
        </HeaderStyled>
    );
};

export default Header;

Header.propTypes = {
    linkTo: PropTypes.string,
    logoSrc: PropTypes.string,
    logoAlt: PropTypes.string,
    logoWidth: PropTypes.string,
    logoHeight: PropTypes.string,
    loggedIn: PropTypes.bool,
    logoutFn: PropTypes.func
};

const HeaderStyled = styled.header`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    gap: 1rem;
    background-color: #ffc357;
    @media (min-width: 375px) {
        flex-direction: row;
    }
`;

const DivStyled = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;
`;

const LinkStyled = styled(Link)`
    background-color: #af1827;
    color: #ffffff;
    display: block;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    border: none;
    font-weight: bold;
    text-decoration: none;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
        rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
        rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    &:hover,
    &:focus-visible {
        background-color: #ffffff;
        color: #af1827;
    }
`;

const LogOutButton = styled.button`
    background-color: #af1827;
    color: #ffffff;
    display: block;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
        rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
        rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    &:hover,
    &:focus-visible {
        background-color: #ffffff;
        color: #af1827;
    }
`;

const ImageStyled = styled.img`
    width: 100px;
    height: auto;
    border-radius: 50%;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
        rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
        rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
`;
