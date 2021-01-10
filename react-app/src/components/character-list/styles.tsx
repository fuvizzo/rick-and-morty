import styled from 'styled-components';

interface CardProps {
  url: string;
}

const GridContainer = styled.div`
  width: 90%;
  max-width: 1240px;
  margin: 70px auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: 20px;
  /*  @media only screen and (min-width: 500px) {
    grid-template-columns: 1fr;
  } */
  @media only screen and (min-width: 1240px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const CardWrapper = styled.div`
  /*  min-height: 300px;
  max-height: 400px; */
  height: 200px;
`;

const Card = styled.a`
  background: white;
  border-radius: 10px;
  text-decoration: none;
  color: #444;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  min-height: 100%;

  position: relative;
  top: 0;
  transition: all 0.1s ease-in;
  :hover {
    top: -2px;
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
  }
`;

const CardContentWrapper = styled.div`
  margin: 0;
  flex-grow: 1;
`;

const CardArticle = styled.article`
  padding: 20px;
`;

const CardHeader = styled.h1`
  font-size: 2em;
  color: #333;
`;

const CardFooter = styled.div`
  font-size: 0.6em;
  justify-content: flex-end;
  display: flex;
`;

const CardParagraph = styled.p`
  line-height: 1.8;
`;

const CardSpan = styled.span`
  font-weight: bold;
  color: #9f74ca;
  text-transform: lowercase;
  letter-spacing: 0.05em;
  margin: 2em 0 0 0;
`;

const CardImage = styled.div`
  width: 200px;
  height: 200px;
  //padding-bottom: 60%;
  border-radius: 10px 0 0 10px;
  background-size: cover;
  background-position: center center;
  background-image: url(${(props: CardProps) => props.url});
`;

export {
  GridContainer,
  Card,
  CardWrapper,
  CardArticle,
  CardHeader,
  CardParagraph,
  CardContentWrapper,
  CardSpan,
  CardImage,
  CardFooter,
};
