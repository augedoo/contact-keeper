import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CLEAR_CONTACTS,
  CONTACT_ERROR,
} from './../types';

const ContactState = (props) => {
  // Create initial state
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
  };

  // Init Reducer
  const [state, dispatch] = useReducer(contactReducer, initialState);

  //===============
  // Actions
  //===============

  // Get contacts
  const getContacts = async () => {
    try {
      const res = await axios.get('api/contacts');
      dispatch({
        type: GET_CONTACTS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Add contact
  const addContact = async (contact) => {
    const config = {
      'Content-Type': 'application/json',
    };

    try {
      const res = await axios.post('api/contacts', contact, config);

      dispatch({
        type: ADD_CONTACT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Delete contact
  const deleteContact = async (id) => {
    try {
      const res = await axios.delete(`api/contacts/${id}`);
      console.log(res.data);

      dispatch({
        type: DELETE_CONTACT,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Set current contact
  const setCurrent = (contact) => {
    dispatch({
      type: SET_CURRENT,
      payload: contact,
    });
  };

  // Clear contacts
  const clearContacts = () => {
    dispatch({
      type: CLEAR_CONTACTS,
    });
  };

  // Clear current contact
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT,
    });
  };

  // Update contact
  const updateContact = async (contact) => {
    const config = {
      'Content-Type': 'application/json',
    };

    try {
      const res = await axios.put(
        `api/contacts/${contact._id}`,
        contact,
        config
      );

      dispatch({
        type: UPDATE_CONTACT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Filter contacts
  const filterContacts = (text) => {
    dispatch({
      type: FILTER_CONTACTS,
      payload: text,
    });
  };

  // Clear filter
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER,
    });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getContacts,
        addContact,
        updateContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        filterContacts,
        clearFilter,
        clearContacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
