import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { contactsReducer, initialState } from './contactsReducer';

const ContactsContext = createContext();

export function ContactsProvider({ children }) {
  const [state, dispatch] = useReducer(contactsReducer, initialState);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('contacts') || '[]');
    dispatch({ type: 'INIT', payload: stored });
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(state.contacts));
  }, [state.contacts]);

  return (
    <ContactsContext.Provider value={{ state, dispatch }}>
      {children}
    </ContactsContext.Provider>
  );
}

export function useContacts() {
  return useContext(ContactsContext);
}