
import mongoose, { Schema } from "mongoose";
import { hash, compare } from "bcryptjs";

const roleSchema = new mongoose.Schema({
    name: {
      type: String,
      enum: ['Organization User', 'Guest', 'Organization Admin' , 'Super Admin'],
      default: 'Organization User'
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  });
  
  const Role = mongoose.model("Role", roleSchema);
  
  export default Role;