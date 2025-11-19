export const validatecartitemid = (cartitemid) => {

  // check for null/undefined
  if (cartitemid === null || cartitemid === undefined) {
    return {
      isvalid: false,
      sanitizedid: null,
      error: 'cart item id is null or undefined'
    };
  }

  const sanitizedid = String(cartitemid).trim();

  // check for empty string after trimming
  if (!sanitizedid) {
    return {
      isvalid: false,
      sanitizedid: null,
      error: 'cart item id is empty after trimming'
    };
  }

  // check for literal 'null' or 'undefined' strings
  if (sanitizedid === 'null' || sanitizedid === 'undefined') {
    return {
      isvalid: false,
      sanitizedid: null,
      error: 'cart item id is literal "null" or "undefined"'
    };
  }

  console.log('🔍 debug: validating cart item id:', {
    original: cartitemid,
    type: typeof cartitemid,
    sanitized: sanitizedid,
    isnumber: /^\d+$/.test(sanitizedid),
    isobjectid: /^[a-fa-f0-9]{24}$/.test(sanitizedid)
  });

  if (sanitizedid === 'null' || sanitizedid === 'undefined' || sanitizedid === '') {
    return {
      isvalid: false,
      sanitizedid: null,
      error: 'cart item id is invalid'
    };
  }

  return {
    isvalid: true,
    sanitizedid,
    error: null
  };
};

// validates a product id to ensure it's safe for api calls
export const validateproductid = (productid) => {

  if (productid === null || productid === undefined) {
    return {
      isvalid: false,
      sanitizedid: null,
      error: 'product id is null or undefined'
    };
  }

  const sanitizedid = String(productid).trim();

  if (!sanitizedid) {
    return {
      isvalid: false,
      sanitizedid: null,
      error: 'product id is empty after trimming'
    };
  }

  if (sanitizedid === 'null' || sanitizedid === 'undefined') {
    return {
      isvalid: false,
      sanitizedid: null,
      error: 'product id is literal "null" or "undefined"'
    };
  }

  // check for valid id patterns
  const valididpatterns = [
    /^[a-fa-f0-9]{24}$/,
    /^[a-za-z0-9_-]+$/,
    /^\d+$/,
  ];

  const isvalidpattern = valididpatterns.some(pattern => pattern.test(sanitizedid));
  
  if (!isvalidpattern) {
    return {
      isvalid: false,
      sanitizedid: null,
      error: 'product id does not match expected pattern'
    };
  }

  return {
    isvalid: true,
    sanitizedid,
    error: null
  };
};