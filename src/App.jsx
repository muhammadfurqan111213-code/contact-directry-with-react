
import React, { useState } from "react";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: ""
  });

  const [editId, setEditId] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Add or Update Contact
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.email) {
      alert("Please fill all fields!");
      return;
    }

    if (editId !== null) {
      // Update existing contact
      setContacts(
        contacts.map((contact) =>
          contact.id === editId
            ? { ...contact, ...formData }
            : contact
        )
      );

      setEditId(null);
    } else {
      // Add new contact
      const newContact = {
        id: Date.now(),
        ...formData
      };

      setContacts([...contacts, newContact]);
    }

    setFormData({
      name: "",
      phone: "",
      email: ""
    });
  };

  // Edit Contact
  const handleEdit = (contact) => {
    setFormData({
      name: contact.name,
      phone: contact.phone,
      email: contact.email
    });

    setEditId(contact.id);
  };

  // Delete Contact
  const handleDelete = (id) => {
    setContacts(
      contacts.filter((contact) => contact.id !== id)
    );
  };

  return (
    <div className="container">

      <h1>Contact Directory</h1>
      <p className="subtitle">Manage your contacts easily</p>

      {/* Contact Form */}
      <div className="form-box">
        <h2>{editId !== null ? "Update Contact" : "Add New Contact"}</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Enter Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />

          <button type="submit" className="add-btn">
            {editId !== null ? "Update Contact" : "Add Contact"}
          </button>

        </form>
      </div>

      {/* Contact Cards */}
      <h2 className="contact-heading">
        My Contacts ({contacts.length})
      </h2>

      <div className="contact-list">

        {contacts.length === 0 ? (
          <p className="empty">No contacts available. Add a contact!</p>
        ) : (

          contacts.map((contact) => (

            <div className="contact-card" key={contact.id}>

              <div className="avatar">
                {contact.name.charAt(0).toUpperCase()}
              </div>

              <h3>{contact.name}</h3>

              <p>📞 {contact.phone}</p>
              <p>✉️ {contact.email}</p>

              <div className="buttons">

                <button
                  className="edit-btn"
                  onClick={() => handleEdit(contact)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(contact.id)}
                >
                  Delete
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default App;
