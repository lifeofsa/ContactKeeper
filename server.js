const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();

app.use(express.json({ extended: false }));

// app.use(express.json({ex}))
connectDB();

app.use('/api/users', require('./routes/users'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/auth', require('./routes/auth'));

// PRODUCTION / BUILD

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')),
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on ${PORT}`));
