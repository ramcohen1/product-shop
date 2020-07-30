const express = require('express')
require('./db/mongoose')
const userRout = require('./routers/user')
const productRout = require('./routers/product')
const categorRout = require('./routers/categor')

const app = express()

app.use(express.json())
app.use(userRout)
app.use(productRout)
app.use(categorRout)

const port = 3001 || process.env.port

app.listen(port, () => console.log('listen on port ' + port))