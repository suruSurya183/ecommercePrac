import Category from "../models/category.model.js";
import { validateCategoryData, validateCategoryUpdateData } from '../validators/category.validator.js';


// Define category creation function
export async function categoryInsert(req, res, next) {
  try {
    // Get category data from request body
    const categoryData = req.body;

    // Validate category data
    const { error } = validateCategoryData(categoryData);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Create a new category instance
    const category = new Category(categoryData);

    // Save category to the database
    const savedCategory = await category.save();

    // Check if category saved successfully
    if (!savedCategory) {
      return res.status(404).json("Category not found");
    }

    // Respond with success message and saved category data
    res.status(200).json({ message: "Category is successfully created", category: savedCategory });
  } catch (error) {
    // Handle errors
    console.error("Error occurring during category creation:", error);
    res.status(500).json({ error: "Server error" });
  }
};


 // Define category update function
 export async function categoryUpdate(req, res, next) {
  try {
    // Get category ID from request parameters
    const categoryId = req.params.id;

    // Get updated category data from request body
    const updatedCategoryData = req.body;

    // Validate updated category data
    const { error } = validateCategoryUpdateData(updatedCategoryData);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Find the category by ID
    const category = await Category.findById({_id:categoryId});

    // Check if category exists
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Update category data
    Object.assign(category, updatedCategoryData);

    // Save updated category to the database
    const updatedCategory = await category.save();

    // Respond with success message and updated category data
    res.status(200).json({ message: "Category is successfully updated", categoryshow: updatedCategory });
  } catch (error) {
    // Handle errors
    console.error("Error occurring during category update:", error);
    res.status(500).json({ error: "Server error" });
  }
};


// Function Delete Category in Database
export async function categorieDelete(req, res, next) {
  try {
    // Get category ID from request parameters
    const categoryId = req.params.id;

    // Update category to disable it
    const updatedCategory = await Category.findOneAndDelete(
      { _id: categoryId },
      { disabled: true }, // Disable the category by setting 'disabled' field to true
      { new: true } // Return the updated document
    );

    // If category not found, return 404 status with error message
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category Not Found" });
    }

    // If category deleted successfully, return 200 status with success message
    res.status(200).json({ message: "Category Deleted Successfully" });
  } catch (error) {
    // If any error occurs, send 500 status with error message
    res.status(500).json({ message: "Something Went Wrong" });
  }
}






// Display single category
export async function showCategory(req, res,next) {
  try {
    // Get category ID from request parameters
    const categoryId = req.params.id;
    console.log(categoryId);

    // Find category by ID
    const category = await Category.findOne({ _id: categoryId });
    console.log(category);

    // If category not found, return 404 status with error message
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // If category found, return it in response
    res.status(200).json({ category });
  } catch (error) {
    // If any error occurs, send 500 status with error message
    res.status(500).json({ message: "Something went wrong" });
  }
};



// Display All category
 export async function showAllcategory(req, res,next) {
  try {
    // Find all categories where 'disabled' field is true
    const categories = await Category.find({ disabled: true });

    // If no categories found or empty array returned
    if (!categories || categories.length === 0) {
      console.log("category not found");
      return res.status(404).json({ message: "Category Not Found" });
    }

    // If categories found, send them in response
    res.status(200).json({ categories });
  } catch (error) {
    // If any error occurs, send 500 status with error message
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

  










  








 