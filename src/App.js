import React from 'react';
import { useState, useEffect } from 'react';
import Form from './components/Form';
import ContactList from './components/CardList';
import Header from './components/Header';

const App = () => {

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch('http://www.raydelto.org/agenda.php')
      .then(response => response.json())
      .then(data => setContacts(data));
  }, []);

  return (
    <div>
      <Header />
      <Form contact={contacts}/>
      <ContactList contacts={contacts} />
    </div>
  )
}

export default App;

