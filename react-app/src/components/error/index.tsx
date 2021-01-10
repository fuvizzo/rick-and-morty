import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../store';
import { setError } from '../../store/ui/actions';
import { SimpleTextWrapper } from '../common-styles';

const connector = connect(
  (state: RootState) => ({
    ui: state.ui,
  }),
  {
    setError,
  },
);

type PropsFromRedux = ConnectedProps<typeof connector>;

const ErrorComponent: React.FC<PropsFromRedux> = (props) => {
  const {
    setError,
    ui: { error },
  } = props;
  React.useEffect(() => {
    const ref = setInterval(() => {
      setError(null);
    }, 5000);

    return () => {
      clearInterval(ref);
    };
  }, [error]);
  return (
    <>
      <SimpleTextWrapper>{error}</SimpleTextWrapper>
    </>
  );
};

export default connector(ErrorComponent);
