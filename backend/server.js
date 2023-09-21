const app = require('./index');

// acquiring mongoose
const { connectDatabase } = require("./config/mongoose");

connectDatabase();


app.listen(process.env.PORT, ()=>{
    console.log(`Server is up and running on port ${process.env.PORT}`);
});