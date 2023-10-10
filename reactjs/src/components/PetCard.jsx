import PropTypes from 'prop-types';
import styled from 'styled-components';
import formatDate from '../utils/formatDate';

const PetCard = (props) => {
    return (
        <ArticleStyled>
            <LeftDivStyled>
                <H2Styled>{props.name}</H2Styled>
                <UlStyled>
                    <LiStyled>
                        Breed: <SpanStyled>{props.breed}</SpanStyled>
                    </LiStyled>
                    <LiStyled>
                        Weight: <SpanStyled>{props.weight}</SpanStyled>
                    </LiStyled>
                    <LiStyled>
                        Age: <SpanStyled>{props.age}</SpanStyled>
                    </LiStyled>
                    <LiStyled>
                        Date Added:{' '}
                        <SpanStyled>{formatDate(props.created_at)}</SpanStyled>
                    </LiStyled>
                </UlStyled>
            </LeftDivStyled>
            <RightDivStyled>
                <InvertedButtonStyled onClick={props.editPet}>
                    Edit
                </InvertedButtonStyled>
                <ButtonStyled onClick={props.deletePet}>Delete</ButtonStyled>
            </RightDivStyled>
        </ArticleStyled>
    );
};

export default PetCard;

PetCard.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    breed: PropTypes.string,
    weight: PropTypes.number,
    age: PropTypes.number,
    created_at: PropTypes.string,
    editPet: PropTypes.func,
    deletePet: PropTypes.func
};

const ArticleStyled = styled.article`
    width: 100%;
    box-sizing: border-box;
    max-width: 1000px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
    border-radius: 1rem;
    background-color: #ffc357;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 15px 0px;
    @media (min-width: 768px) {
        flex-direction: row;
    }
`;
const LeftDivStyled = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;
const RightDivStyled = styled.div`
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    @media (min-width: 768px) {
        flex-direction: row;
    }
`;
const H2Styled = styled.h2`
    text-align: center;
    margin: 0;
    @media (min-width: 768px) {
        text-align: left;
    }
`;
const ButtonStyled = styled.button`
    flex: 1;
    background-color: #af1827;
    color: #ffffff;
    width: 100%;
    display: block;
    padding: 1rem 0.5rem;
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
const InvertedButtonStyled = styled.button`
    flex: 1;
    background-color: #ffffff;
    color: #af1827;
    width: 100%;
    display: block;
    padding: 1rem 0.5rem;
    border-radius: 0.5rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
        rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
        rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    &:hover,
    &:focus-visible {
        background-color: #af1827;
        color: #ffffff;
    }
`;
const UlStyled = styled.ul`
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    @media (min-width: 768px) {
        flex-direction: row;
    }
`;
const LiStyled = styled.li`
    font-weight: bold;
    text-align: center;
    @media (min-width: 768px) {
        text-align: left;
    }
`;
const SpanStyled = styled.span`
    font-weight: normal;
`;
