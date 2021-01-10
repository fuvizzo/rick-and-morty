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

const Input = styled.input`
  width: 100%;
  border-radius: 5px;
  border: 1px solid #333333;
  box-sizing: border-box;
  padding: 0.5em;
  margin: 0.5em;
  height: 40px;
  font-size: 1em;
`;

const Button = styled.button`
  width: 100%;
  border-radius: 5px;
  padding: 0.5em;
  margin: 0.5em;
  height: 40px;
  font-size: 1em;
  background: #9f74ca;
  color: #fff;
`;

export {
  Title, FormElemWrapper, Input, Button, Container,
};
