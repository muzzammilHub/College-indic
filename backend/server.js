const app = require('./index');
const cors = require('cors');

// acquiring mongoose
const { connectDatabase } = require("./config/mongoose");

connectDatabase();

app.use(cors());

app.listen(process.env.PORT, ()=>{
    console.log(`Server is up and running on port ${process.env.PORT}`);
});