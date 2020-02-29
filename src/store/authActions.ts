import {Dispatch} from "redux";
import {TAuth} from "./formTypes";
import authAPI from "../api/authAPI";

export const SET_AUTH = 'AUTH/SET_AUTH'

interface ISingIn {
    type: typeof SET_AUTH
    email: string | null
    idToken: string | null
    localId: string | null
    expiresIn: number | null
    refreshToken: string | null
    registered: boolean
}

export type TAuthActions = ISingIn
const setAuth = (email: string|null, idToken: string|null,
                 localId: string|null, expiresIn: number | null,
                 refreshToken: string | null, registered: boolean): TAuthActions => ({
    type: SET_AUTH,
    email,
    idToken,
    localId,
    expiresIn,
    refreshToken,
    registered

})

export const logout = () => (dispatch:Dispatch) => {
    dispatch(setAuth(null, null, null, null, null, false))
}
//
// const refreshToken = async (token:string) => {
//     const response = await authAPI.refreshToken(token)
//
// }

const autoRefreshToken = (time:number) => (dispatch:any, getState: any) => {
    const auth = getState().auth
    setTimeout(async() => {
        const fetch = async () => {
            try {
                return await authAPI.refreshToken(auth.refreshToken)
            } catch (e) {
                return e.response.data
            }

        }
        const response = await fetch()
        if (response) {
            const { expires_in, id_token, refresh_token, user_id } = response
            const expires = (new Date()).getTime() + Number(`${expires_in}000`)
            dispatch(setAuth(auth.email, id_token, user_id, expires, refresh_token, true))
        }
        dispatch(autoRefreshToken(+(response.expires_in) - 100))


    }, time * 1000)
}

export const singIn = ({email, password}: TAuth) => async (dispatch: any) => {
    try {
        const response = await authAPI.singIn(email, password)
        if (!response.error) {
            const {email, idToken, localId, expiresIn, registered, refreshToken}:ISingIn = response
            const expires = (new Date()).getTime() + Number(`${expiresIn}000`)
            dispatch(setAuth(email, idToken, localId, expires, refreshToken, registered))
            dispatch(autoRefreshToken(expires - 1000))
            return 0
        }
        return 1
    } catch (e) {
        debugger
    }

}
export const singUp = ({email, password}: TAuth) => async (dispatch: Dispatch) => {
    try {
        const response = await authAPI.singUp(email, password)
        if (!response.error) {
            const {email, idToken, localId, expiresIn, refreshToken}:ISingIn = response
            dispatch(setAuth(email, idToken, localId, expiresIn, refreshToken, true))
            return 0
        }
        return 1
    } catch (e) {
        debugger
    }
}
