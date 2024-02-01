import { BaseService } from "./BaseServices";
import { useSelector, useDispatch } from "react-redux";
import { logoutAuth } from "../store/authSlice";

const SIGNUP = '/v1/user/register'

const dispatch = useDispatch();

class AuthService extends NonAuthBaseService {
  signUp(formData) {
    return this.post(SIGNUP, formData);
  }
}

export default new AuthService();
