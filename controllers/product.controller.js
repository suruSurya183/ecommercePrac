import Product from "../models/product.model.js";
import {validateProductData} from "../validators/product.validator.js";

// Define product  creation function
export async function productInsert(req, res, next) {
    try {
      // Get product data from request body
      const productData = req.body;
  
      // Validate product data
      const { error } = validateProductData( productData );
      if (error) {
        return res.status(400).json({ error: error.message });
      }
  
      // Create a new product instance
      const product = new Product( productData );
  
      // Save product to the database
      const savedproduct = await product.save();
  
      // Check if product saved successfully
      if (!savedproduct) {
        return res.status(404).json("Product not found");
      }
  
      // Respond with success message and saved product data
      res.status(200).json({ message: "Product is successfully created", productshow: savedproduct });
    } catch (error) {
      // Handle errors
      console.error("Error occurring during Product creation:", error);
      res.status(500).json({ error: "Server error" });
    }
  };
  