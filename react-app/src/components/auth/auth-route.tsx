import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../store';
import { IAuth } from '../../store/auth/types';

const connector = connect(
  (state: RootState) => ({
    auth: state.user.auth,
  }),
);

type PropsFromRedux = ConnectedProps<typeof connector>

interface PrivateRouteProps extends RouteProps, PropsFromRedux {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  auth: IAuth;

}

const AuthRoute: React.FC<PrivateRouteProps> = (props: PrivateRouteProps) => {
  const { children, auth, ...rest } = props;

  return (<Route
    {...rest}
    render={(routeProps) => (auth.isAuthenticated ? (
      children
    ) : (
        <Redirect
          to={{
            pathname: '/authentication/sign-in',
            state: { from: routeProps.location },
          }}
        />
    ))
    }
  />);
};

export default connector(AuthRoute);
