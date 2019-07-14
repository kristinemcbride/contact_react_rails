import React, { Component } from 'react';
import Header from './Components/Header';
import Contact from './Components/Contact';
import axios from 'axios';
import NewContactForm from './Components/NewContactForm';
import EditContactForm from './Components/EditContactForm';


class App extends Component{

  state = {
      contacts: [],
      editingContactId: null
    }

  componentDidMount() {
// waits until app is fully loaded then excecutes code withing
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
        };
        axios.get('/api/v1/contacts', {headers})
        .then(response => {
          const sortedData = response.data.sort((a, b) => (a.id > b.id) ? 1 : -1)
          console.log(sortedData)
            this.setState({
                contacts: sortedData
            })
        })
        .catch(error => alert(error.response))
    }


  addNewContact = (first_name, last_name, phone_number, email) => {
    axios.post('/api/v1/contacts', { contact: { first_name, last_name, phone_number, email } })
      .then(response => {
        console.log(response)
        const contacts = [...this.state.contacts, response.data]
        this.setState({ contacts })
      })
      .catch(error => {
        alert("Invalid email, please try again.")
      })
  }

  removeContact = (id) => {
    axios.delete('/api/v1/contacts/' + id)
      .then(response => {
        const contacts = this.state.contacts.filter(
          contact => contact.id !== id
        )
        this.setState({ contacts })
      })
      .catch(error => console.log(error.response))
  }

  editingContact = (id) => {
    this.setState({
      editingContactId: id
    })
  }


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
        const newList = this.state.contacts.filter((item) => item.id !== updatedContact.id)
        newList.push(updatedContact)
        const sortedData = newList.sort((a, b) => (a.id > b.id) ? 1 : -1)
        this.setState({
          contacts: sortedData,
          editingContactId: null

        })
      })
      .catch(error => alert("Invalid email, please try again."));
  }

  render(){
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
