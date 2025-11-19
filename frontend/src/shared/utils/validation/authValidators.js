// validates user authentication status
export const validateuserauth = (user) => {
  if (!user) {
    return {
      isvalid: false,
      email: null,
      error: 'user object is null or undefined'
    };
  }

  if (!user.email) {
    return {
      isvalid: false,
      email: null,
      error: 'user email is missing'
    };
  }

  // basic email validation
  const emailpattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailpattern.test(user.email)) {
    return {
      isvalid: false,
      email: null,
      error: 'user email format is invalid'
    };
  }

  return {
    isvalid: true,
    email: user.email,
    error: null
  };
};