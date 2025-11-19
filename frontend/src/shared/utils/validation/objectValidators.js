import { validateproductid } from './idValidators.js';

export const validateproductobject = (product) => {
    
  // check if product exists and is an object
  if (!product || typeof product !== 'object') {
    return {
      isvalid: false,
      error: product === null ? 'product is null' : 
             product === undefined ? 'product is undefined' :
             `product is not an object (type: ${typeof product})`
    };
  }

  // check if product has a valid id
  const idvalidation = validateproductid(product._id || product.id);
  if (!idvalidation.isvalid) {
    return {
      isvalid: false,
      error: `product has invalid id: ${idvalidation.error}`
    };
  }

  return {
    isvalid: true,
    error: null
  };
};