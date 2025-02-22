export const validateName = (name , fieldName) => {
  if (!/^[A-Za-z\s]+$/.test(name)) {
    return `${fieldName} cannot contain numbers or special characters.`;
  }
  return "";
};

export const validatePhone = (phone,fieldName) => {
  if (!/^\d+$/.test(phone)) {
    return `${fieldName} must contain only digits.`;
  }
  // if (phone.length !== 10) {
  //   return "Phone number must be exactly 10 digits.";
  // }
  return "";
};

export const validateEmail = (email) => {
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return "Please enter a valid email address.";
  }
  return "";
};
