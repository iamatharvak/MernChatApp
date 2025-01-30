const mongoose = require("mongoose");
const bycrpt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      default: "https://img.icons8.com/skeuomorphism/64/skull.png",
    },
  },
  {
    timeStamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bycrpt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bycrpt.genSalt(10);
  this.password = bycrpt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
module.exports = User;
