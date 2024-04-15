// csvControllerUpload.js
import asyncHandler from 'express-async-handler';
import csv from 'fast-csv';
import fs from 'fs';
import path from 'path';
import Product from '../models/productModel.js';


const createCSV = asyncHandler( async (req, res) => {

  const __dirname = path.resolve()

  const totalRecords = [];
  

try{

  fs.createReadStream(path.join(__dirname, './','/uploads/'+ req.file.filename))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', row => {
      // Convert minPrice and maxPrice to integers
      const minPrice = parseInt(row.minPrice, 10);
      const maxPrice = parseInt(row.maxPrice, 10);

      // Create the priceRange object
      const priceRange = {
        minPrice,
        maxPrice
      };

      // Add the priceRange object to the row
      totalRecords.push({ ...row,minPrice, maxPrice, priceRange });
    })
    .on('end', async rowCount => {
     
      try{
        const products = await Product.insertMany(totalRecords);
        res.json(products);
      }catch(err){
        res.status(400).json(err);
      }
    });

  }catch(error){
    res.status(400).json(error)
  }
});

export { createCSV };

