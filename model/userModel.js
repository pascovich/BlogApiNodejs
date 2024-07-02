import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

// import shemas from mongoose
const { Schema } = mongoose;

// define the schemas
const userSchema = Schema(
  {
    nom: { type: String },
    username: { type: String, unique: true },
    password: { type: String },
    dateNaissance: { type: Date, default: Date.now },
    tel: { type: String },
    email: { type: String, unique: true },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

// methods
userSchema.methods.hashPassword = function hashPassword(password) {
  const salt = bcryptjs.genSaltSync(parseInt(process.env.SALT, 10));
  return bcryptjs.hashSync(password, salt);
};

userSchema.methods.comparePassword = function comparePassword(password) {
  return bcryptjs.compareSync(this.password, password);
};
// userSchema.statics.deleteById = function (id) {
//   return this.findByIdAndDelete(id);
// };
// create a model
const userModel = mongoose.model("user", userSchema);

export default userModel;
