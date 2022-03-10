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

    
    app.post("/products", async (req, res) => {
      products=req.body.products;
      price=req.body.price;
      discrption=req.body.discrption;
      pic=req.files.image;
      picData=pic.data;
      encoded=picData.toString('base64');
      encodedpic=Buffer.from(encoded,'base64');
      const user={
        products,
        discrption,
        price,
        image:encoded
      }
      const personal= await  watchCollection.insertOne(user);
      res.json(personal);
    });

    app.get('/products',async(req,res)=>{
      const coursor=watchCollection.find({});
      const watch=await coursor.toArray();
      res.send(watch);
    })
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
