export const validateName = (name) => {
  if (!/^[A-Za-z\s]+$/.test(name)) {
    return "Name cannot contain numbers or special characters.";
  }
  return "";
};

export const validatePhone = (phone) => {
  if (!/^\d+$/.test(phone)) {
    return "Phone number must contain only digits.";
  }
  if (phone.length !== 10) {
    return "Phone number must be exactly 10 digits.";
  }
  return "";
};

export const validateEmail = (email) => {
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return "Please enter a valid email address.";
  }
  return "";
};
