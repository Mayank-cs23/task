const express = require('express');
const app = express();
const PORT = 3000;
app.get('/', (req, res) => {
    res.send('Server Running');
});
app.get('/users', (req, res) => {
    res.json(users);
});
app.use((req, res, next) => {
    const currentTime = new Date().toLocaleString();

    console.log(`Request received at: ${currentTime}`);
    console.log(`${req.method} ${req.url}`);

    next();
});
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: "Name and email are required" });
    }
    const exists = users.find(user => user.email === email);
    if (exists) {
        return res.status(400).json({ message: "Email already exists" });
    }
    const newUser = {
        id: users.length + 1,
        name,
        email
    };
    users.push(newUser);
    res.status(201).json(newUser);
});
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    users.splice(index, 1);
    res.json({ message: "User deleted successfully" });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});