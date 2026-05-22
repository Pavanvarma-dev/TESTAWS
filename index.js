const express = require('express');
const app = express();
const port = 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Dummy data for testing
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

// API 1: GET /api/users (Get all users)
app.get('/api/users', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Users retrieved successfully',
    data: users
  });
});

// API 2: GET /api/users/:id (Get user by ID)
app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  res.status(200).json({
    success: true,
    message: 'User retrieved successfully',
    data: user
  });
});

// API 3: POST /api/users (Create a new user)
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Name and email are required' });
  }

  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name,
    email
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: newUser
  });
});

// API 4: PUT /api/users/:id (Update a user)
app.put('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;
  
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  // Update user
  users[userIndex] = { ...users[userIndex], name: name || users[userIndex].name, email: email || users[userIndex].email };

  res.status(200).json({
    success: true,
    message: 'User updated successfully',
    data: users[userIndex]
  });
});

// API 5: DELETE /api/users/:id (Delete a user)
app.delete('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  const deletedUser = users.splice(userIndex, 1);

  res.status(200).json({
    success: true,
    message: 'User deleted successfully',
    data: deletedUser[0]
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
