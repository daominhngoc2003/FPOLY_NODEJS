import mongoose from "mongoose";
import mongoosePanigate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    image: {
      type: String,
    },
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true, versionKey: false }
);
productSchema.plugin(mongoosePanigate);
export default mongoose.model("Products", productSchema);
