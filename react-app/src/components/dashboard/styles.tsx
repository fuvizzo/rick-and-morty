import styled from 'styled-components';

const MainHeaderWrapper = styled.div`
  height: 50px;
  width: 100%;
  position: fixed;
  top: 0;
  color:#fff;
  background: #9f74ca;
  z-index: 10;
`;

const MainHeader = styled.div`
  width: 90%;
  margin: auto;
`;

export {
  MainHeader,
  MainHeaderWrapper,
};
