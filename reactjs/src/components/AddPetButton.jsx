import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const AddPetButton = (props) => {
    return <LinkStyled to={props.link}>{props.text}</LinkStyled>;
};

export default AddPetButton;

AddPetButton.propTypes = {
    link: PropTypes.string,
    text: PropTypes.string
};

const LinkStyled = styled(Link)`
    position: fixed;
    bottom: 0;
    padding: 1rem;
    margin: 2rem;
    background-color: #af1827;
    color: #ffffff;
    display: block;
    border-radius: 0.5rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    text-decoration: none;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
        rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
        rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    &:hover,
    &:focus-visible {
        background-color: #ffffff;
        color: #af1827;
    }
    @media (min-width: 768px) {
        right: 0;
    }
`;
