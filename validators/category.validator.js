import Joi from 'joi';

// Validate the category data
export function validateCategoryData(categoryData) {
  const categorySchema = Joi.object({
    categoryName: Joi.string().required(),
    description: Joi.string(),
    disabled: Joi.boolean().default(false)
  });

  const { error, value } = categorySchema.validate(categoryData);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return value;
}


// Validate category data for update
export function validateCategoryUpdateData(categoryData) {
  const categorySchema = Joi.object({
    categoryName: Joi.string(),
    description: Joi.string(),
    disabled: Joi.boolean().default(false)
  });

  // Validate the provided data against the schema
  const { error, value } = categorySchema.validate(categoryData);

  // If there's an error, throw an exception with the error message
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }

  // If validation passes, return the validated data
  return value;
}
