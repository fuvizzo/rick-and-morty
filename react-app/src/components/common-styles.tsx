import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface ButtonProps {
  width?: string;
  height?: string;
}

const Title = styled.h1`
 font-size: 3.5em;
    text-align: center;
    
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
  flex-direction: column;
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
  width:${(props: ButtonProps) => props.width || '100%'};
  height:${(props: ButtonProps) => props.height || '40px'};
  border-radius: 5px;
  padding: 0.5em;
  margin: 0.5em; 
  line-height: 1px;
  font-size: 1.4em;
  background: #9f74ca;
  border: 1px solid #8812a0;
  color: #fff;
`;

const SimpleTextWrapper = styled.span`
  color: #fff; 
`;

const SimpleLink = styled(Link)`
  color: #fff; 
`;

export {
  Title,
  FormElemWrapper,
  SimpleTextWrapper,
  SimpleLink,
  Input,
  Button,
  Container,
};
