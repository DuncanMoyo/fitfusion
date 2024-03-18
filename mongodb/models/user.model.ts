import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  // Basic user details
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },

  // User identification and contact
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  clerkId: { type: String, required: true, unique: true },

  // User profile
  photo: { type: String, required: true },
});

const UserModel = models.User || model("User", UserSchema);

export default UserModel;
