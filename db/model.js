import mongoose from "mongoose";

const { Schema } = mongoose;

const customerSchema = new Schema({
  name: { type: String, required: true },
  boxes: { type: Number, required: true },
  buckets: { type: Number, required: true },
});

const Customer =
  mongoose.models.Cutstomer || mongoose.model("Customer", customerSchema);

export default Place;
