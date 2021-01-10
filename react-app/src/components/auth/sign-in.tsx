import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { setError } from '../../store/ui/actions';
import {
  Title,
  FormElemWrapper,
  Input,
  Button,
  Container,
} from '../common-styles';
import * as authActions from '../../store/auth/thunk';
import { RootState } from '../../store';

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

interface IUserLoginData {
  email: string
  password: string
}

export const UserListComponent: React.FC<PropsFromRedux> = (props) => {
  const [userLoginData, setUserLoginData] = React.useState<IUserLoginData>({
    email: 'fulvio.cusimano@hotmail.com',
    password: 'password',
  });
  const history = useHistory();
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
    setUserLoginData({
      ...userLoginData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const signInHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (error) {
      setError(null);
    }
    signInWithEmailAndPassword(userLoginData.email, userLoginData.password);
  };

  return <Container>
    {isAuthenticated && <Redirect to="/dashboard" />}
    <form onSubmit={signInHandler}>
      <FormElemWrapper>
        <Input
          type="text"
          name="email"
          placeholder="email"
          value={userLoginData.email}
          onChange={handleUserData} />
      </FormElemWrapper>
      <FormElemWrapper>
        <Input
          type="password"
          name="password"
          placeholder="password"
          value={userLoginData.password}
          onChange={handleUserData} />
      </FormElemWrapper>
      <FormElemWrapper>
        <Button
          data-testid="more-btn"
        >
          Sign In
      </Button>
        <div>
          {loading && 'Loading...please wait...'}
        </div>
      </FormElemWrapper>
    </form>
  </Container>;
};

export default connector(UserListComponent);
