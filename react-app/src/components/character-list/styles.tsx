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
  @media only screen and (min-width: 500px) {
    grid-template-columns: 1fr 1fr;
  }
  @media only screen and (min-width: 850px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const CardWrapper = styled.div`
  min-height: 300px;
`;

const Card = styled.a`
  background: white;
  border-radius: 10px ;
  text-decoration: none;
  color: #444;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  min-height: 100%;
  position: relative;
  top: 0;
  transition: all 0.1s ease-in;
  :hover {
    top: -2px;
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
  }
`;

const CardArticle = styled.article`
  padding: 20px;
`;

const CardHeader = styled.h1`
  font-size: 20px;
  margin: 0;
  color: #333;
`;

const CardParagraph = styled.p`
  line-height: 1.4;
`;

const CardSpan = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 2em 0 0 0;
`;

const CardImage = styled.div`
  padding-bottom: 60%;
  border-radius: 10px 10px 0 0;
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
  CardSpan,
  CardImage,
};
