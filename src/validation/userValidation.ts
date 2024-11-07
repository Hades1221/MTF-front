// Validation for the "First Name" field
export const firstNameValidation = {
  required: 'First name is required',
  pattern: {
    value: /^[A-Za-z]+(?: [A-Za-z]+)*$/,
    message: 'First name can only contain letters with a single space between words', 
  },
};

// Validation for the "Last Name" field
export const lastNameValidation = {
  required: 'Last name is required',
  pattern: {
    value: /^[A-Za-z]+(?: [A-Za-z]+)*$/, 
    message: 'Last name can only contain letters with a single space between words',
  },
};

// Validation for the "Role" field
export const roleValidation = {
  required: 'Role is required',
};

// Validation for the "Email" field
export const emailValidation = {
  required: 'Email is required',
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: 'Invalid email format',
  },
};

// Validation for the "Phone Number" field
export const phoneValidation = {
  required: 'Phone number is required', 
  pattern: {
    value: /^\+?[0-9]\d{1,14}$/, 
    message: 'Invalid phone number format', 
  },
};