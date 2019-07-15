import React, { Component } from 'react';

// EDIT COMPONENT
class EditContactForm extends Component {

  // sets the state of the Contact being edited
  state = {
    edit: {
      id: this.props.contact.id,
      first_name: this.props.contact.first_name,
      last_name: this.props.contact.last_name,
      phone_number: this.props.contact.phone_number,
      email: this.props.contact.email
    }
  }

  // assigns the inputed values to the edit state
  handleChange = (e) => {
    const newObject = Object.assign(this.state.edit)
    newObject[e.target.name] = e.target.value
    this.setState({
      edit: newObject,
    })
  }

  // when submit it clicked, the edit state values are assigned to the selected contact
  handleSubmit = (e) => {
    e.preventDefault()
    const { id, first_name, last_name, phone_number, email } = this.state.edit
    this.props.editContact(id, first_name, last_name, phone_number, email);
  }

  // renders edit form
  render() {
    return(
      <form onSubmit={this.handleSubmit} className="edit-form-wrapper">
        <div className="edit-form-container">
          <div>
            <input name="first_name"
                   type="text"
                   value={this.state.edit.first_name}
                   onChange={this.handleChange} />
          </div>
          <div>
            <input name="last_name"
                   type="text"
                   value={this.state.edit.last_name}
                   onChange={this.handleChange} />
          </div>
          <div>
            <input name="phone_number"
                   type="text"
                   value={this.state.edit.phone_number}
                   onChange={this.handleChange} />
          </div>
          <div>
            <input name="email"
                   type="text"
                   value={this.state.edit.email}
                   onChange={this.handleChange} />
          </div>
          <div>
            <button className="edit-btn">Update Contact</button>
          </div>
        </div>
      </form>
    )
  }
}
export default EditContactForm;
