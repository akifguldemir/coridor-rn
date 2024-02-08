import * as yup from 'yup';

const loginValidationSchema = yup.object().shape({
  email: yup.string().email('Geçerli bir e-posta adresi girin').required('E-posta zorunludur'),
  password: yup.string().min(6, 'Şifre en az 6 karakter olmalı').required('Şifre zorunludur'),
});

export default loginValidationSchema;
