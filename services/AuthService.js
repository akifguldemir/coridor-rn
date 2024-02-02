import { BaseService } from "./BaseServices";
import { NonAuthBaseService } from "./NonAuthBaseService";

const SIGNUP = '/v1/user/register'


class AuthService extends NonAuthBaseService {
  signUp(formData) {
    return this.post(SIGNUP, formData);
  }
}

export default new AuthService();
