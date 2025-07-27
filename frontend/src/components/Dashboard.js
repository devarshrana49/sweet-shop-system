import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Best practice: Define the API URL in one place
const API_URL = 'https://sweet-shop-api-devarsh.onrender.com';

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
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Sweet Shop Dashboard</h1>
        <div>
          <span style={{ marginRight: '15px' }}>Welcome, {user.username}!</span>
          <button onClick={onLogout} style={{ padding: '5px 15px' }}>Logout</button>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search sweets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', width: '300px', marginRight: '15px' }}
        />
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          {showAddForm ? 'Cancel' : 'Add Sweet'}
        </button>
      </div>

      {showAddForm && (
        <div style={{ backgroundColor: '#f8f9fa', padding: '20px', marginBottom: '20px', borderRadius: '5px' }}>
          <h3>Add New Sweet</h3>
          <form onSubmit={handleAddSweet} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
            <input type="text" placeholder="Sweet Name" value={newSweet.name} onChange={(e) => setNewSweet({...newSweet, name: e.target.value})} required style={{ padding: '10px' }} />
            <input type="text" placeholder="Category" value={newSweet.category} onChange={(e) => setNewSweet({...newSweet, category: e.target.value})} required style={{ padding: '10px' }} />
            <input type="number" step="0.01" placeholder="Price" value={newSweet.price} onChange={(e) => setNewSweet({...newSweet, price: e.target.value})} required style={{ padding: '10px' }} />
            <input type="number" placeholder="Quantity" value={newSweet.quantity} onChange={(e) => setNewSweet({...newSweet, quantity: e.target.value})} required style={{ padding: '10px' }} />
            <input type="text" placeholder="Description" value={newSweet.description} onChange={(e) => setNewSweet({...newSweet, description: e.target.value})} style={{ padding: '10px', gridColumn: 'span 2' }} />
            <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', gridColumn: 'span 2', cursor: 'pointer' }}>
              Add Sweet
            </button>
          </form>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {filteredSweets.map(sweet => (
          <div key={sweet.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px' }}>
            <h3>{sweet.name}</h3>
            <p><strong>Category:</strong> {sweet.category}</p>
            <p><strong>Price:</strong> ${sweet.price}</p>
            <p><strong>Available:</strong> {sweet.quantity}</p>
            <p><strong>Description:</strong> {sweet.description}</p>
            <button 
              onClick={() => handlePurchase(sweet.id)}
              disabled={sweet.quantity === 0}
              style={{ 
                padding: '10px 20px', 
                backgroundColor: sweet.quantity > 0 ? '#ffc107' : '#6c757d', 
                color: 'white', 
                border: 'none',
                borderRadius: '3px',
                cursor: sweet.quantity > 0 ? 'pointer' : 'not-allowed'
              }}
            >
              {sweet.quantity > 0 ? 'Purchase' : 'Out of Stock'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;