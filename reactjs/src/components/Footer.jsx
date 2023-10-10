import styled from 'styled-components';

const Footer = () => {
    return (
        <FooterStyled>
            <p>Copyright &copy; {new Date().getFullYear()}</p>
        </FooterStyled>
    );
};

export default Footer;

const FooterStyled = styled.footer`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #ffc357;
`;
