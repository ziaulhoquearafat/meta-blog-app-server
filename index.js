const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
require("dotenv").config();

// middleware
app.use(express.json());

const blogRoutes = require("./src/routes/blog.routes");
app.use("/blogs", blogRoutes);

// mongoose configuration BY ATLAS
// async function main() {
//   await mongoose.connect(
//     "mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.6prdapd.mongodb.net/?appName=Cluster0",
//   );
// }

// mongoose configuration BY MONGODB SOFTWARE
async function main() {
  await mongoose.connect(process.env.DB_URL);

  app.get("/", (req, res) => {
    res.send("Meta Blog Server Is Running!");
  });
}

main()
  .then(() => console.log("Mongodb Connected Successfully"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server is Running On Port ${port}`);
});
