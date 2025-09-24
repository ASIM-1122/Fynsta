const mongoose = require('mongoose');
const dbgr = require('debug')('development:mongoose');
const dburl = process.env.MONGODB_URI || 'mongodb://localhost:27017/Fynsta';

const dbConnect = async () => {
    try{
        await mongoose.connect(dburl,{useNewUrlParser: true, useUnifiedTopology: true});
        dbgr('Connected to MongoDB');
    } catch (err) {
        dbgr('Error connecting to MongoDB:', err);
    }
}

module.exports = dbConnect;