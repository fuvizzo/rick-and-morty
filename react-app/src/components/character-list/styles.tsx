import styled from 'styled-components';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;
const FormElemWrapper = styled.div`
  margin: 0.5em;
  width: 400px;
`;

const Container = styled.div`
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GridContainer = styled.div`
  width: 90%;
  max-width: 1240px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: 20px;
  @media only screen and (min-width: 850px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const Card = styled.a`
  background: white;
  text-decoration: none;
  color: #444;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

export { GridContainer, Card };
