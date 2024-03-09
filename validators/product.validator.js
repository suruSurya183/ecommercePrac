import Joi from 'joi';

// Validate product data
export function validateProductData(productData) {
    const productSchema = Joi.object({
      categoryId: Joi.string().required(),
      itemId: Joi.string().required(),
      itemName: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
      photos: Joi.array().items(Joi.string()),
      quantityInStock: Joi.number().required(),
      offers: Joi.string(),
      disabled: Joi.boolean().default(false)
    });
  
    const { error, value } = productSchema.validate(productData);
    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(", ");
      throw new Error(errorMessage);
    }
    return value;
  }




