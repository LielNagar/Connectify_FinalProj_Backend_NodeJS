const express = require("express");
require("./db/mongoose");
const sharp = require("sharp");
const multer = require("multer");
const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload a .jpg/.jpeg/.png file"));
    }
    return cb(undefined, true);
  },
});
const cors = require('cors');

const User = require("./models/user");
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors())
app.get("/users/:id", async (req,res)=>{
    console.log('here:', req.params.id)
    try{
        const user = await User.findOne({id: req.params.id})
        if(!user) throw new Error();
        res.send(user)
    }catch(e){
        res.send(e)
    }
})

app.post("/user", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send();
  }
});

app.post(
  `/users/:id/avatar`,
  upload.single("avatar"),
  async (req, res) => {
    try{
      const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    const user = await User.findOne({ id: req.params.id });
    user.avatar = buffer;
    user.save();
    res.send();
    }catch(e){
      res.status(400).send({ error: e.message });
    }
  }
);

app.get('/users/:id/avatar', async (req,res)=>{
    try{
        const user= await User.findOne({id: req.params.id})
        if(!user || !user.avatar) throw new Error()
        res.set('Content-Type','image/png')
        res.send(user.avatar)
    }catch(e){
        res.status(404).send()
    }
})


app.listen(port, () => {
  console.log("Server is up on port", port);
});
