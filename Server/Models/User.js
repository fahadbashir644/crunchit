const {Schema, model} = require("mongoose");

const UserSchema = Schema({
  _id: Schema.Types.ObjectId,
  email: { type: String, require: true },
  password: { type: String, require: true },
  balance: { type: Number, default: 0 },
});

module.exports = model("User", UserSchema);