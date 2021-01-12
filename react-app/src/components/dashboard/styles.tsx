import styled from 'styled-components';
import { IComponentProps } from '../common-styles';

const DashboardContainer = styled.div`
  overflow-y: scroll;
  height: ${(props: IComponentProps) => props.height};
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

export { DashboardContainer, MainHeader, MainHeaderWrapper };
