const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchemas = Joi.object({
  favorite: Joi.boolean().required(),
});

const booksSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const schemas = {
  addSchema,
  updateFavoriteSchemas,
};

booksSchema.post("save", handleMongooseError);

const Book = model("contact", booksSchema);

module.exports = { schemas, Book };
