import React, { useState, useContext, useEffect } from 'react';
import ContactContext from './../../context/contacts/contactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const { addContact, updateContact, current, clearCurrent } = contactContext;

  useEffect(() => {
    if (current) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
      });
    }
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });

  const { name, email, phone, type } = contact;

  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // Detect whether adding new or update old contact
    if (!current) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    clearCurrent();
  };

  // Clear all form fields
  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit Contact' : 'Add Contact'}
      </h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Phone'
        name='phone'
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        id='radio-personal'
        checked={type === 'personal'}
        onChange={onChange}
      />
      <label htmlFor='radio-personal'>Personal</label>{' '}
      <input
        type='radio'
        name='type'
        value='professional'
        id='radio-professional'
        checked={type === 'professional'}
        onChange={onChange}
      />
      <label htmlFor='radio-professional'>Professional</label>{' '}
      <div>
        <input
          type='submit'
          value={current ? 'Update Contact' : 'Add Contact'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button onClick={clearAll} className='btn btn-light btn-block'>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
