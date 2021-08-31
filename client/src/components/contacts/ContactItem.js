import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';
const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrent, clearCurrent } = contactContext;
  const { _id, name, type, email, phone, location } = contact;

  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };
  const onCurrent = () => {
    setCurrent(contact);
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}
        {''}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }
        >
          {type.charAt(0).toUpperCase()}
          {type.slice(1)}
        </span>
      </h3>
      <h5>
        <ul className='list text-left'>
          {email && (
            <li>
              <i className='fas fa-envelope-open'></i> {email}
            </li>
          )}
          {phone && (
            <li>
              <i className='fas fa-phone'></i> {phone}
            </li>
          )}
          {location && (
            <li>
              <i className=' fas fa-map-marker-alt ' aria-hidden='true'></i>{' '}
              {location}
            </li>
          )}
        </ul>
        <p className='text-left'>
          <button className='btn btn-dark btn-sm' onClick={onCurrent}>
            Edit
          </button>
          <button className='btn btn-danger btn-sm' onClick={onDelete}>
            Delete
          </button>
        </p>
      </h5>
    </div>
  );
};
ContactItem.propType = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
