const express = require('express')

const app = express()

app.get('/' , (req, res) => res.json({"Message" : "Hello Welcome React Developer"}))

app.use('/api/users' , require('./routes/users'))
app.use('/api/contact' , require('./routes/contact'))
app.use('/api/auth' , require('./routes/auth'))


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`server started on ${PORT}`))