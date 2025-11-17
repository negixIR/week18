import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ContactsProvider } from './context/ContactsContext';
import Header from './components/Header';
import ContactList from './pages/ContactList';
import AddContact from './pages/AddContact';
import './styles.css';

function App() {
  return (
    <ContactsProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<ContactList />} />
          <Route path="/add" element={<AddContact />} />
        </Routes>
      </Router>
    </ContactsProvider>
  );
}

export default App;