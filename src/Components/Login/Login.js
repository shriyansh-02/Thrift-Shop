import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault(); // Prevents the page from refreshing when you submit
    
    // Sends the email and password to your Node.js server
    axios.post('http://localhost:5000/api/auth/login', { email, password })
      .then((response) => {
        // Save the token and user data to the browser's local storage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.result));
        
       alert('Logged in successfully!');
window.location.href = '/'; // Forces a hard reload so the Header updates
      })
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Login to Thrift Shop</h2>
      
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          style={{ margin: '10px', padding: '10px', width: '250px' }}
          required 
        />
        
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          style={{ margin: '10px', padding: '10px', width: '250px' }}
          required 
        />
        
        <button type="submit" style={{ padding: '10px 30px', marginTop: '10px', cursor: 'pointer' }}>
          Login
        </button>
      </form>

      <p style={{ marginTop: '20px', cursor: 'pointer', color: 'blue', textDecoration: 'underline' }} 
         onClick={() => history.push('/signup')}>
        Don't have an account? Signup
      </p>
    </div>
  );
}

export default Login;