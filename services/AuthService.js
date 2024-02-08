import { BaseService } from "./BaseServices";

const SIGNUP = '/users/register'
const LOGIN = '/login'

class AuthService extends BaseService {
  signUp(formData) {
    console.log(formData)
    return this.post(SIGNUP, formData);
  }
  login (formData) {
    return this.post(LOGIN, formData)
  }
}

export default new AuthService();
