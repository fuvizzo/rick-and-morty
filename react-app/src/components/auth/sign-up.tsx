import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setError } from '../../store/ui/actions';
import {
  FormElemWrapper,
  Input,
  Button,
  SimpleTextWrapper,
  SimpleLink,
} from '../common-styles';
import * as authActions from '../../store/auth/thunk';
import { RootState } from '../../store';
import { IUserSignUpData } from '../../store/auth/types';
import Error from '../error';

const connector = connect(
  (state: RootState) => ({
    user: state.user,
    ui: state.ui,
  }),
  {
    setError,
    ...authActions,
  },
);

type PropsFromRedux = ConnectedProps<typeof connector>

export const UserListComponent: React.FC<PropsFromRedux> = (props) => {
  const [userSignData, setUserSignUpData] = React.useState<IUserSignUpData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const {
    signUp,
    setError,
    user: {
      auth: {
        isAuthenticated,
      },
    },
    ui: {
      loading,
      error,
    },
  } = props;

  const handleUserData = (e: React.FormEvent<HTMLInputElement>): void => {
    setUserSignUpData({
      ...userSignData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const signUpHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (error) {
      setError(null);
    }
    signUp(userSignData);
  };

  return (
    <>
      {isAuthenticated && <Redirect to="/dashboard" />}
      <form onSubmit={signUpHandler}>
         <FormElemWrapper>
          <Input
            type="text"
            name="firstName"
            placeholder="firstName"
            value={userSignData.firstName}
            onChange={handleUserData}
          />
        </FormElemWrapper>
        <FormElemWrapper>
          <Input
            type="text"
            name="lastName"
            placeholder="lastName"
            value={userSignData.lastName}
            onChange={handleUserData}
          />
        </FormElemWrapper>
        <FormElemWrapper>
          <Input
            type="text"
            name="email"
            placeholder="email"
            value={userSignData.email}
            onChange={handleUserData}
          />
        </FormElemWrapper>
        <FormElemWrapper>
          <Input
            type="password"
            name="password"
            placeholder="password"
            value={userSignData.password}
            onChange={handleUserData}
          />
        </FormElemWrapper>
        <FormElemWrapper>
          <Button data-testid="more-btn">Sign Up</Button>
          <SimpleTextWrapper>
            {loading && 'Signing up...please wait...'}
          </SimpleTextWrapper>
          <Error />
        </FormElemWrapper>
      </form>
      <SimpleLink to="./sign-in">Already registered? Sign in then!</SimpleLink>
    </>
  );
};

export default connector(UserListComponent);
