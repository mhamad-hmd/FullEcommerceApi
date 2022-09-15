
const ProductSchema = new mongoosee.Schema(
    {
        title: { type: String, required:true, unique:true },
        desc: { type: String, required:true },
        password: { type: String, required:true},
        categories: { type: Array },
        size: {type: String},
        color: {type: String},
        price: {type: Number, required: true}
    },
    {timestamps: true }
);

module.exports = mongoosee.model("Product", ProductSchema);



