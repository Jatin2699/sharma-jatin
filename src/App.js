import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import HeaderLogo from './HeaderLogo';

// Sidebar component
const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="menu">
        <li><a href="/"><i className="fa fa-home"></i> Home</a></li>
        <li><a href="/"><i className="fa fa-user"></i> Profile</a></li>
        <li><a href="/"><i className="fa fa-envelope"></i> Messages</a></li>
      </ul>
    </div>
  );
};

// Main App component
const App = () => {
  // State variables
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    number: '',
    role: '',
    email: ''
  });

  // Function to handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      // Handle update logic here
      const updatedUsers = users.map(user =>
        user.id === formData.id ? { ...formData } : user
      );
      setUsers(updatedUsers);
      setEditMode(false);
      setFormData({
        id: null,
        name: '',
        number: '',
        role: '',
        email: ''
      });
      setShowForm(false);
    } else {
      // For simplicity, assuming id is generated as a timestamp
      const newFormData = { ...formData, id: Date.now() };
      setUsers([...users, newFormData]);
      setFormData({
        id: null,
        name: '',
        number: '',
        role: '',
        email: ''
      });
      setShowForm(false);
    }
  };

  // Function to handle user deletion
  const handleDelete = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
  };

  // Function to handle user edit
  const handleEdit = (user) => {
    setFormData({ ...user });
    setEditMode(true);
    setShowForm(true);
  };

  return (
    <div>
      <header className="header-container">
        <div className="container">
          <Sidebar />
          <HeaderLogo />
          <div className="user-button">
            <button onClick={() => setShowForm(true)}> <i className="fas fa-plus"></i>Add User</button>
          </div>
        </div>
      </header>
      <div className="content">
        <main>
          {showForm && (
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" />
              <input type="number" name="number" value={formData.number} onChange={handleInputChange} placeholder="Number" />
              <input type="text" name="role" value={formData.role} onChange={handleInputChange} placeholder="Role" />
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" />
              <button   type="submit">{editMode ? 'Update' : 'Submit'}</button>
            </form>
          )}
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Number</th>
                <th>Role</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.number}</td>
                  <td>{user.role}</td>
                  <td>{user.email}</td>
                  <td>
                    <button onClick={() => handleEdit(user)}>Edit</button>
                    <button onClick={() => handleDelete(user.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
};

export default App;
