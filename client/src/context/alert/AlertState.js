import { v4 as uuid } from 'uuid';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';
import { useReducer } from 'react';

const AlertState = (props) => {
  const initState = [];

  const [state, dispatch] = useReducer(AlertReducer, initState);

  //   SET_ALERT
  const setAlert = (msg, type) => {
    const id = uuid();
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id },
    });
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 3600);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
