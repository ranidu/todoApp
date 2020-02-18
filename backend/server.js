const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const chalk = require('chalk');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(chalk.blue(`connection to monogodb is established`));
    }catch(e){
        console.log(chalk.red(`error in mongodb connection ${e}`));
    }
};

connectDB();

const router = require('./routes');
app.use('/api', router);

app.listen(port, () => {
    console.log(chalk.blue(`server is running on port ${port}`));
});


