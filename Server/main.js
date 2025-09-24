require('dotenv').config();
require('cookie-parser');

const cookieParser = require('cookie-parser');
const dbConnect = require('./config/db'); // Ensure database connection is established
const userRoute = require('./routes/userRoute');

dbConnect();
const express = require ('express');
const app = express();
const path = require('path');



app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use('/users', userRoute);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
