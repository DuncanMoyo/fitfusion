import { Schema, model, models, Document } from "mongoose";

export interface IFitnessEvent extends Document {
  _id: string;
  title: string;
  description?: string;
  category: { _id: string; name: string };
  price?: string;
  isFree: boolean;
  createdAt: Date;
  startDateTime: Date;
  endDateTime: Date;
  venue?: string;
  url?: string;
  imageUrl: string;
  organiser: { _id: string; firstName: string; lastName: string };
}

const FitnessEventSchema = new Schema({
  // Basic event details
  title: { type: String, required: true },
  description: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  price: { type: String },
  isFree: { type: Boolean, default: false },

  // Event timing
  createdAt: { type: Date, default: Date.now },
  startDateTime: { type: Date, default: Date.now },
  endDateTime: { type: Date, default: Date.now },

  // Event location and resources
  venue: { type: String },
  url: { type: String },
  imageUrl: { type: String, required: true },

  // Event organiser
  organiser: { type: Schema.Types.ObjectId, ref: "User" },
});

const FitnessEvent =
  models.FitnessEvent || model("FitnessEvent", FitnessEventSchema);

export default FitnessEvent;
