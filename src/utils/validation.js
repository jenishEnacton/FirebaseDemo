import * as yup from 'yup';

// sigu up form validation
export const signUpValidationSchema = yup.object().shape({
  fullName: yup
    .string()
    .matches(/(\w.+\s).+/, 'Enter at least 2 names')
    .required('Full name is required'),
  phoneNumber: yup
    .string()
    .matches(
      /^(?:(?:\+{0,1}91)|0|91)?[6-9][0-9]{9}$/,
      'Enter a valid phone number',
    )
    .required('Phone number is required'),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email is required'),
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .matches(
      /[!@#$%^&*()\-_"=+{}; :,<.>]/,
      'Password must have a special character',
    )
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
});

// login form validation
export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

export const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
});

export const mobileNumberSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .matches(
      /^(?:(?:\+{0,1}91)|0|91)?[6-9][0-9]{9}$/,
      'Enter a valid phone number',
    )
    .required('Phone number is required'),
});

export const otpSchema = yup.object().shape({
  Otp: yup
    .string()
    .matches(/^\d{6}$/, 'Enter a valid 6-digit OTP')
    .required('OTP is required'),
});

export const productPurchaseValidationSchema = yup.object().shape({
  fullName: yup
    .string()
    .matches(/(\w.+\s).+/, 'Enter at least 2 names')
    .required('Full name is required'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  phoneNumber: yup
    .string()
    .matches(
      /^(?:(?:\+{0,1}91)|0|91)?[6-9][0-9]{9}$/,
      'Enter a valid phone number',
    )
    .required('Phone number is required'),
  productName: yup.string().required('Product Name is required'),
  quantity: yup
    .number()
    .positive('Quantity must be a positive number')
    .integer('Quantity must be an integer')
    .required('Quantity is required'),
  rate: yup
    .number()
    .positive('Rate must be a positive number')
    .required('Rate is required'),
});
