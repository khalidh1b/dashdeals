import { validateproductobject } from './objectValidators.js';
import { validateproductid } from './idValidators.js';
import { validateuserauth } from './authValidators.js';

export const validatedeletecartoperation = (product, user) => {
    
  // validate product
  const productvalidation = validateproductobject(product);
  if (!productvalidation.isvalid) {
    return {
      isvalid: false,
      productid: null,
      useremail: null,
      error: productvalidation.error
    };
  }

  // validate user
  const uservalidation = validateuserauth(user);
  if (!uservalidation.isvalid) {
    return {
      isvalid: false,
      productid: null,
      useremail: null,
      error: uservalidation.error
    };
  }

  // get sanitized product id
  const productid = validateproductid(product._id || product.id).sanitizedid;

  return {
    isvalid: true,
    productid,
    useremail: uservalidation.email,
    error: null
  };
};