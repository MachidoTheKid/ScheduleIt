const mongoose = require('mongoose');

const dbConnection = async () => {

    try{

        const connect = await mongoose.connect(process.env.MONGO_URI, {

            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        console.log(`Successful Connection to Database: ${connect.connection.host}`)

    }catch (err){

        console.error(err)
        process.exit(1);

    }
}

module.exports = dbConnection