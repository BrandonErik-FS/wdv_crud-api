import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Header = (props) => {
    return (
        <HeaderStyled>
            <LinkStyled to={props.linkTo}>
                <ImageStyled
                    src={props.logoSrc}
                    alt={props.logoAlt}
                    width={props.logoWidth}
                    height={props.logoHeight}
                />
            </LinkStyled>
        </HeaderStyled>
    );
};

export default Header;

Header.propTypes = {
    linkTo: PropTypes.string,
    logoSrc: PropTypes.string,
    logoAlt: PropTypes.string,
    logoWidth: PropTypes.string,
    logoHeight: PropTypes.string
};

const HeaderStyled = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #ffc357;
`;

const LinkStyled = styled(Link)``;

const ImageStyled = styled.img`
    width: 100px;
    height: auto;
    border-radius: 50%;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
        rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
        rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
`;
