const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, default: "" },
  email: { type: String, unique: true, required: true, default: "" },
  hashedPassword: { type: String, required: true, default: "" }
});

// Inject to mongoose models
module.exports = mongoose.model("User", UserSchema);
