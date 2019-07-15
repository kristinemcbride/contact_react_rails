import React, { Component } from 'react';
import axios from 'axios';
import Header from './Components/Header';
import Contact from './Components/Contact';
import NewContactForm from './Components/NewContactForm';
import EditContactForm from './Components/EditContactForm';

// APP COMPONENT
class App extends Component {

  // sets the default state
  state = {
      contacts: [],
      editingContactId: null
    }

  // sorts data by key
  handleSort(data) {
    data.sort((a, b) => (a.id > b.id) ? 1 : -1)
    return data
  }

  // WAITS FOR THE APP TO FULLY LOAD
  componentDidMount() {
    // headers formats the code as JSON
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };

    axios.get('/api/v1/contacts', {headers})
      .then(response => {
        const contacts = this.handleSort(response.data)
        this.setState({ contacts })
      })
      .catch(error => alert(error.response))
    }

  // CREATE A NEW CONTACT
  addNewContact = (first_name, last_name, phone_number, email) => {
    axios.post('/api/v1/contacts', { contact: { first_name, last_name, phone_number, email } })
      .then(response => {
        // creates a copy of the contacts to change the state and add new data
        const contacts = [...this.state.contacts, response.data]
        this.setState({ contacts })
      })
      .catch(error => {
        alert("Invalid email, please try again.")
      })
  }

  // DELETE A CONTACT
  removeContact = (id) => {
    axios.delete('/api/v1/contacts/' + id)
      .then(response => {
        // filter out the contact whose ID matches the one selected
        const contacts = this.state.contacts.filter(
          contact => contact.id !== id
        )
        this.setState({ contacts })
      })
      .catch(error => console.log(error.response))
  }

  // EDIT A CONTACT
  editingContact = (id) => {
    this.setState({
      // changes the state of editing contact from null to the ID
      editingContactId: id
    })
  }

  // will run for the contact whose ID matches the editingContactId
  editContact = (id, first_name, last_name, phone_number, email) => {
    axios.put('/api/v1/contacts/' + id, {
      contact: {
        first_name,
        last_name,
        email,
        phone_number
      }
    })
    .then(response => {
      const updatedContact = response.data
      // filters out the contact whose ID was selected and replaces it with a contact that has the updated info
      const newList = this.state.contacts.filter((contact) => contact.id !== updatedContact.id)
      newList.push(updatedContact)
      // sorts contact by key, resets the contacts state with the updated info & changes the editingContactId state back to null
      const contacts = this.handleSort(newList)
      this.setState ({
        contacts,
        editingContactId: null
      })
    })
    .catch(error => alert("Invalid email, please try again."));
  }

  // renders all components to the browser
  // contact-cards is a conditional statement rendering the contact info if editContactId is not equal to the contact id.
  // otherwise it will render the edit contact form.
  render() {
    return(
      <div className="contacts-container">
        <Header />
        <div className="contacts-wrapper">
          <div className="contact-cards">
            {this.state.contacts.map((contact) => {
              if (this.state.editingContactId === contact.id) {
                return (<EditContactForm
                  contact={contact}
                  key={contact.id}
                  editContact={this.editContact}
                />)
              } else {
                return (<Contact
                  contact={contact}
                  key={contact.id}
                  onRemoveContact={this.removeContact}
                  editingContact={this.editingContact}
                />)
              }
            })}
          </div>
          <NewContactForm onNewContact={this.addNewContact} />
        </div>
      </div>
    )
  }
}
export default App;
