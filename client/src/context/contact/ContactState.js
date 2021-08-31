import axios from 'axios';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import {
  GET_CONTACT,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  CLEAR_CONTACT,
  UPDATE_CONTACT,
  CONTACT_ERROR,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from '../types';
import { useReducer } from 'react';
import contactContext from './contactContext';

const ContactState = (props) => {
  const initstate = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
  };
  const [state, dispatch] = useReducer(ContactReducer, initstate);
  // GET_CONTACT
  const getContacts = async () => {
    try {
      const res = await axios.get('/api/contact?');
      dispatch({ type: GET_CONTACT, payload: res.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };
  // ADD_CONTACT
  const addContact = async (contacts) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/contact', contacts, config);
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.msg,
      });
    }
  };

  // DELETE_CONTACT
  const deleteContact = async (id) => {
    try {
      await axios.delete(`/api/contact/${id}`);
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.msg,
      });
    }
  };
  // UPDATE_CONTACT
  const updateContact = async (contacts) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.put(
        `/api/contact/${contacts._id}`,
        contacts,
        config,
      );
      dispatch({
        type: UPDATE_CONTACT,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.msg,
      });
    }
  };

  // CLEAR_CONTACT
  const clearContact = () => {
    dispatch({
      type: CLEAR_CONTACT,
    });
  };
  // SET_CURRENT
  const setCurrent = (contacts) => {
    dispatch({ type: SET_CURRENT, payload: contacts });
  };
  // CLEAR_CURRENT
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // FILTER_CONTACTS
  const filterContact = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };
  // CLEAR_FILTER
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };
  return (
    <ContactContext.Provider
      value={{
        current: state.current,
        contacts: state.contacts,
        filtered: state.filtered,
        error: state.error,
        filterContact,
        clearFilter,
        setCurrent,
        clearCurrent,
        addContact,
        deleteContact,
        updateContact,
        getContacts,
        clearContact,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};
export default ContactState;
