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
import { IUserSignInData } from '../../store/auth/types';
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
  const [userSignInData, setUserSignInData] = React.useState<IUserSignInData>({
    email: '',
    password: '',
  });
  const {
    getNewAccessToken,
    signInWithEmailAndPassword,
    setError,
    user: {
      auth: {
        userId,
        isAuthenticated,
      },
    },
    ui: {
      loading,
      error,
    },
  } = props;

  React.useEffect(() => {
    if (!(isAuthenticated || userId)) {
      getNewAccessToken();
    }
  }, [isAuthenticated]);

  const handleUserData = (e: React.FormEvent<HTMLInputElement>): void => {
    setUserSignInData({
      ...userSignInData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const signInHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (error) {
      setError(null);
    }
    signInWithEmailAndPassword(userSignInData);
  };

  return (
    <>
      {isAuthenticated && <Redirect to="/dashboard"/>}
      <form onSubmit={signInHandler}>
        <FormElemWrapper>
          <Input
            type="text"
            name="email"
            placeholder="email"
            value={userSignInData.email}
            onChange={handleUserData}
          />
        </FormElemWrapper>
        <FormElemWrapper>
          <Input
            type="password"
            name="password"
            placeholder="password"
            value={userSignInData.password}
            onChange={handleUserData}
          />
        </FormElemWrapper>
        <FormElemWrapper>
          <Button data-testid="more-btn">Sign In</Button>
          <SimpleTextWrapper>
            {loading && 'Loading...please wait...'}
          </SimpleTextWrapper>
          <Error />
        </FormElemWrapper>
      </form>
      <SimpleLink to="./sign-up">Sign up here!</SimpleLink>
    </>
  );
};

export default connector(UserListComponent);
