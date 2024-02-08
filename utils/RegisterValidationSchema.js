import * as yup from 'yup';

const registerValidationSchema = yup.object().shape({
  fullName: yup.string().required('*Lütfen ad - soyad giriniz.'),
  username: yup.string().required('*Lütfen kullanıcı adı giriniz.'),
  email: yup.string().email('Geçerli bir e-posta adresi giriniz.').required('E-posta zorunludur'),
  password: yup.string().min(6, 'Şifre en az 6 karakter olmalıdır.').required('Şifre zorunludur'),
  birthday: yup.string().required('*Lütfen doğum tarihinizi giriniz.'),
  phone: yup.string().required('*Lütfen telefon numaranızı giriniz.'),
  gender: yup.string().required('*Lütfen cinsiyet bilgisini giriniz.'),
  city: yup.string().required('*Lütfen şehir bilgisini giriniz.'),
});

export default registerValidationSchema;
