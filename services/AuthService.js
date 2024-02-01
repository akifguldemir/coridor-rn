import { BaseService } from "./BaseServices"
import { useSelector, useDispatch } from "react-redux";
import { logoutAuth } from "../store/authSlice";

const REFRESH_TOKEN_PATH = '/token/refresh'

const dispatch = useDispatch();

class AuthService extends BaseService {

    async renewToken (refreshToken) {
        if (refreshToken != null) {
            return this.post(REFRESH_TOKEN_PATH, { refresh_token: refreshToken }).then(response => {
                return response
            })
        } else {
            const redirectToUrl = localStorage.getItem('redirectToUrl')
            if (redirectToUrl === undefined || redirectToUrl === null) {
                const redirectToUrl = window.location.pathname
                localStorage.setItem('redirectToUrl', redirectToUrl)
                // toast.error('Bu sayfaya erişebilmek için giriş yapmalısınız')
            }
            dispatch(logoutAuth())
        }
    }
}

export default new AuthService()
