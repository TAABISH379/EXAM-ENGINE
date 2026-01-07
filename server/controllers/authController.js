const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findUserByEmail, createUser } = require('../utils/db');

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_123';

exports.register = async (req, res) => {
    try {
        const { name, email, password, className, board } = req.body;

        if (!name || !email || !password || !className || !board) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const existingUser = findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password: hashedPassword,
            className,
            board,
            createdAt: new Date().toISOString()
        };

        if (createUser(newUser)) {
            // Auto login after register
            const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '24h' });

            // Remove password from response
            // eslint-disable-next-line no-unused-vars
            const { password, ...userWithoutPassword } = newUser;

            res.status(201).json({
                message: 'Registration successful',
                token,
                user: userWithoutPassword
            });
        } else {
            res.status(500).json({ error: 'Failed to save user' });
        }

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });

        // eslint-disable-next-line no-unused-vars
        const { password: _, ...userWithoutPassword } = user;

        res.json({
            message: 'Login successful',
            token,
            user: userWithoutPassword
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
