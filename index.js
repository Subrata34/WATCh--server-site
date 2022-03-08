const express = require("express");
const app = express();
const cors = require("cors");
const filesUpload = require("express-fileupload");
const { MongoClient } = require("mongodb");

const port = process.env.PORT || 5000;


//meddle wear
app.use(express());
app.use(cors());
app.use(filesUpload());

//mongodb connection
const uri =
  `mongodb+srv://watch:UzCIQ14mWuvFpjYy@cluster0.g4aj0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log(uri);
//function 

//function
async function run() {
  try {
    await client.connect();
    const database = client.db('watch');
    const watchCollection = database.collection('products');

    
    app.get("/products", async (req, res) => {
      console.log(req.body);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Watch server site link");
});
app.listen(port, () => {
  console.log(`listening port part${port} `);
});
