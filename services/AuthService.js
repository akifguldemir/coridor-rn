import { BaseService } from "./BaseServices";

const SIGNUP = '/v1/user/register'


class AuthService extends BaseService {
  signUp(formData) {
    return this.post(SIGNUP, formData);
  }
  login (formData) {
    return this.post(LOGIN_PATH, formData).then(response => {
      return response
    })
  }
}

export default new AuthService();
