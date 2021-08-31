import React, { useContext, useEffect } from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import AuthContext from '../../context/auth/authContext';
// import ContactContext from '../../context/contact/contactContext';

const Home = () => {
  // const contactContext = useContext(ContactContext);
  // const { contacts, loading } = contactContext;
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.userLoaded();
    // estlint-disable-next-line
  }, []);
  return (
    <div className='grid-2'>
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
