import mongoose from "mongoose";
import mongoosepaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
productSchema.plugin(mongoosepaginate);
export default mongoose.model("Product", productSchema);
