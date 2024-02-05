import { BaseService } from "./BaseServices";

const SIGNUP = '/register'
const LOGIN = '/login'

class AuthService extends BaseService {
  signUp(formData) {
    return this.post(SIGNUP, formData);
  }
  login (formData) {
    return this.post(LOGIN, formData)
  }
}

export default new AuthService();
