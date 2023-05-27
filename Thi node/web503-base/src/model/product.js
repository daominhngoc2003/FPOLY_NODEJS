import mongoose from "mongoose";
import mongoosepaginate from "mongoose-paginate-v2";

const productschema = new mongoose.Schema(
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
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

productschema.plugin(mongoosepaginate);
export default mongoose.model("Product", productschema);
