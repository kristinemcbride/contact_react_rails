import React from 'react';

// CONTACT COMPONENT
const Contact = ({contact, onRemoveContact=f=>f, editingContact=f=>f}) =>
    <div className="contact-card" key={contact.id}>
        <h3 className="contact-header">{contact.first_name} {contact.last_name}</h3>
        <p className="contact-number"><i className="fas fa-phone-square-alt"></i>&nbsp;{contact.phone_number}</p>
        <p className="contact-email"><i className="fas fa-envelope-open-text"></i>&nbsp;{contact.email}</p>
        <div className="contact-btns">
          <button className="delete-btn" onClick={() => onRemoveContact(contact.id)}>✖</button>
          <button className="edit-btn" onClick={() => editingContact(contact.id)}>Edit</button>
        </div>
    </div>
export default Contact;
