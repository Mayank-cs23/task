const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());

app.use((req, res, next) => {
    const currentTime = new Date().toISOString();
    console.log(`Request received at: ${currentTime}`);
    console.log(`${req.method} ${req.url}`);
    next();
});


let users = [];


app.get('/', (req, res) => {
    res.json({
        message: "Server Running",
        time: new Date().toISOString()
    });
});


app.get('/users', (req, res) => {
    res.json({
        message: "Users retrieved successfully",
        time: new Date().toISOString(),
        data: users
    });
});


app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);
    
    if (!user) {
        return res.status(404).json({
            message: "User not found",
            time: new Date().toISOString()
        });
    }
    
    res.json({
        message: "User retrieved successfully",
        time: new Date().toISOString(),
        data: user
    });
});


app.post('/users', (req, res) => {
    const { name, email } = req.body;
    
    if (!name || !email) {
        return res.status(400).json({
            message: "Name and email are required",
            time: new Date().toISOString()
        });
    }
    
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({
            message: "Email already exists",
            time: new Date().toISOString()
        });
    }
    
    const newUser = {
        id: users.length + 1,
        name: name,
        email: email
    };
    
    users.push(newUser);
    
    res.status(201).json({
        message: "User added successfully",
        time: new Date().toISOString(),
        user: newUser
    });
});

app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex === -1) {
        return res.status(404).json({
            message: "User not found",
            time: new Date().toISOString()
        });
    }
    
    users.splice(userIndex, 1);
    
    res.json({
        message: "User deleted successfully",
        time: new Date().toISOString()
    });
});


app.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({
            message: "All fields required",
            time: new Date().toISOString()
        });
    }
    
    if (email === 'admin@gmail.com' && password === '1234') {
        return res.json({
            message: "Login Success",
            time: new Date().toISOString()
        });
    }
    
    res.status(401).json({
        message: "Invalid Credentials",
        time: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
