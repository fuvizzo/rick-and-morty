import styled from 'styled-components';

const Container = styled.div`
  overflow-y: scroll;
  height: 600px;
`;

const MainHeaderWrapper = styled.div`
  height: 50px;
  width: 100%;
  position: fixed;
  top: 0;
  color: #fff;
  background: #9f74ca;
  z-index: 10;
  align-items: stretch;
  display: flex;
`;

const MainHeader = styled.div`
  display: flex;
  width: 90%;  
  font-size: 1.5em;
  margin: auto;
  justify-content: space-between;
`;

export { Container, MainHeader, MainHeaderWrapper };
