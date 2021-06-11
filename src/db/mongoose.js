const mongoose = require('mongoose')
require('dotenv').config();
// if not working, try: mongodb://127.0.0.1:27017/DBNAME
mongoose.connect(`${process.env.DB_URI}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})