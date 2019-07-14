import React from 'react';

//NEWCONTACT COMPONENT
// containing the function for adding a contact
const NewContactForm = ({onNewContact = f => f}) => {
  let first_name, last_name, phone_number, email
  //Function called when form is submitted. Form values are assigned to the contact.
  const submit = e => {
    e.preventDefault()
    onNewContact(first_name.value, last_name.value, phone_number.value, email.value)
    first_name.value = ''
    last_name.value = ''
    phone_number.value = ''
    email.value = ''
  }

  //new contact form
  return (
    <div className="contact-form" id="contact-form">
      <form onSubmit={submit}>
        <div className="inputs">
          <label >First Name</label>
          <input ref={input => first_name = input}
          type="text"
          required />
          <label >Last Name</label>
          <input ref={input => last_name = input}
          type="text"
          required />
          <label >Phone Number</label>
          <input ref={input => phone_number = input}
          type="text"
          required />
          <label >Email</label>
          <input ref={input => email = input}
          type="text"
          required />
        </div>
        <div className="submit-div">
          <button className="new-contact-submit-btn">Add Contact</button>
        </div>
        </form>
    </div>
  )
}

export default NewContactForm;
