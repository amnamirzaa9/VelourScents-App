 const express=require(`express`);
 const path=require(`path`);
 const {connectdb}=require(`./config/db`);
 connectdb();

 const app=express();
 app.use(express.json());
 
   app.use(express.urlencoded({ extended: true }));
const session = require("express-session");
 const PORT_NUMBER=3000;
  app.listen(PORT_NUMBER,()=>console.log(`server started on http://localhost:${PORT_NUMBER}`));

 app.set(`view engine`,`ejs`);
 app.use(express.static(path.join(__dirname,`public`)));
 app.use(session({
  secret:'yahyamirza',
  resave: false,
    saveUninitialized: true
 }));

 const authRoutes = require('./routes/authRoutes');
 const cartRoutes=require('./routes/cartRoutes');
 const orderRoutes=require('./routes/orderRoutes');
 const pageRoutes=require('./routes/pageRoutes');
 const productRoutes=require('./routes/productRoutes');
 const quizRoutes=require('./routes/quizRoutes');
app.use(authRoutes);
app.use(cartRoutes);
app.use(orderRoutes);
app.use(pageRoutes);
app.use(productRoutes);
app.use(quizRoutes);

 

 
 















