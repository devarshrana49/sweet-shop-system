import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css'; // Import the new CSS file

// Best practice: Define the API URL in one place
// Use the production URL from Netlify, but if it doesn't exist, use the local one.
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Dashboard({ onLogout }) {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSweet, setNewSweet] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    description: ''
  });

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchSweets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchSweets = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/sweets`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSweets(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching sweets:', error);
      if (error.response?.status === 401) {
        onLogout(); // Log out if token is invalid
      }
      setLoading(false);
    }
  };

  const handleAddSweet = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/sweets`, newSweet, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setNewSweet({ name: '', category: '', price: '', quantity: '', description: '' });
      setShowAddForm(false);
      fetchSweets();
    } catch (error) {
      console.error('Error adding sweet:', error);
    }
  };

  const handlePurchase = async (sweetId) => {
    try {
      await axios.post(`${API_URL}/api/sweets/${sweetId}/purchase`,
        { quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchSweets(); // Refresh the list
    } catch (error) {
      alert('Error purchasing sweet: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  const filteredSweets = sweets.filter(sweet =>
    sweet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sweet.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <header className="header">
        <h1>Sweet Shop</h1>  &nbsp; &nbsp; &nbsp;
        {/* This div now has the correct className */}
        <div className="user-info">
          <span>Welcome, {user.username}!</span>
          <button onClick={onLogout} className="btn">Logout</button>
        </div>
      </header>

      <div className="controls-container">
        <input
          type="text"
          placeholder="Search sweets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn"
        >
          {showAddForm ? 'Cancel' : 'Add Sweet'}
        </button>
      </div>

      {showAddForm && (
        <div className="add-sweet-form card">
          <h3>Add New Sweet</h3>
          <form onSubmit={handleAddSweet} className="form-grid">
            <input type="text" placeholder="Sweet Name" value={newSweet.name} onChange={(e) => setNewSweet({ ...newSweet, name: e.target.value })} required />
            <input type="text" placeholder="Category" value={newSweet.category} onChange={(e) => setNewSweet({ ...newSweet, category: e.target.value })} required />
            <input type="number" step="0.01" placeholder="Price" value={newSweet.price} onChange={(e) => setNewSweet({ ...newSweet, price: e.target.value })} required />
            <input type="number" placeholder="Quantity" value={newSweet.quantity} onChange={(e) => setNewSweet({ ...newSweet, quantity: e.target.value })} required />
            <input type="text" placeholder="Description" value={newSweet.description} onChange={(e) => setNewSweet({ ...newSweet, description: e.target.value })} className="full-width" />
            <button type="submit" className="btn full-width">
              Add Sweet
            </button>
          </form>
        </div>
      )}

      <main className="dashboard">
        {filteredSweets.map(sweet => (
          <div key={sweet.id} className="card">
            <h3>{sweet.name}</h3>
            <div className="value">${sweet.price}</div>
            <p><strong>Category:</strong> {sweet.category}</p>
            <p><strong>Available:</strong> {sweet.quantity}</p>
            <p>{sweet.description}</p>
            <button
              onClick={() => handlePurchase(sweet.id)}
              disabled={sweet.quantity === 0}
              className="btn"
            >
              {sweet.quantity > 0 ? 'Purchase' : 'Out of Stock'}
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}

export default Dashboard;
