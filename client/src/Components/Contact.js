import React from 'react';

const Contact = ({contact, onRemoveContact=f=>f, editingContact=f=>f}) =>
    <div className="contact-card" key={contact.id}>
        <h3 className="contact-header">{contact.first_name} {contact.last_name}</h3>
        <p className="contact-number">{contact.phone_number}</p>
        <p className="contact-email">{contact.email}</p>
        <div className="contact-btns">
          <button className="delete-btn" onClick={() => onRemoveContact(contact.id)}>✖</button>
          <button className="edit-btn" onClick={() => editingContact(contact.id)}>Edit</button>
        </div>
    </div>
export default Contact;
