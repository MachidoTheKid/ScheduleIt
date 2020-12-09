const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const path = require('path')
const morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')
const mongoStore = require('connect-mongo')(session)
//const ejs = require('ejs')
const methodOverride = require('method-override')
const exphbs = require('express-handlebars');
const dbConnection = require('./configuration/db')
const bodyParser = require('body-parser')

dotenv.config({path: './configuration/config.env'})

//Passport
require('./configuration/passport')(passport)

dbConnection()

const app = express();


//Handlebars setup (Extension Change)

app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

//Session Mid
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: new mongoStore({ mongooseConnection: mongoose.connection})
}))


//PP Mid
app.use(passport.initialize())
app.use(passport.session())

if(process.env.NODE_ENV === "development"){

    app.use(morgan('dev'))
}

//Static Assets
app.use(express.static(path.join(__dirname, 'public')))

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

//Method Override

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
  }))


//Routing Functionality

app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/assignments', require('./routes/assignments'))






const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Server Currently Running On Port ${PORT}. Press CTRL+C To Terminate.`));

