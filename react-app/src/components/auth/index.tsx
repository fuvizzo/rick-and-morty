import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { Container, SimpleTextWrapper, Title } from '../common-styles';

import SignIn from './sign-in';
import SignUp from './sign-up';

const AuthOperations: React.FC = () => {
  const { path } = useRouteMatch();
  const signInPath = `${path}/sign-in`;
  const signUpPath = `${path}/sign-up`;

  return (
    <Container>
      <Title>
        <SimpleTextWrapper>
          The Rick and Morty API...by Fulvio
        </SimpleTextWrapper>
      </Title>
      <Switch>
        <Route path={signInPath}>
          <SignIn />
        </Route>
        <Route path={signUpPath}>
          <SignUp />
        </Route>
      </Switch>
    </Container>
  );
};

export default AuthOperations;
