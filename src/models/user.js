const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  avatar: {
    type: Buffer,
  },
  userName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  location: {
    type: String,
  }
});

userSchema.pre("save", async function (next) {
  const user = this;
  // if (user.isModified("password"))
  //   user.password = await bcrypt.hash(user.password, 8);
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
