import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { contactsReducer, initialState } from './contactsReducer';

const ContactsContext = createContext();

export function ContactsProvider({ children }) {
  const [state, dispatch] = useReducer(contactsReducer, initialState);

  // Init from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('contacts') || '[]');
    dispatch({ type: 'INIT', payload: stored });
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(state.contacts));
  }, [state.contacts]);

  const value = { state, dispatch };
  return <ContactsContext.Provider value={value}>{children}</ContactsContext.Provider>;
}

export function useContacts() {
  return useContext(ContactsContext);
}