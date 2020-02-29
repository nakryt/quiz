import {IAuth} from "./storeTypes";
import {SET_AUTH, TAuthActions} from "./authActions";

const initialState:IAuth = {
    registered: false,
    idToken: null,
    localId: null,
    email: null,
    expiresIn: null,
    refreshToken: null
}

export default (state = initialState, action:TAuthActions): IAuth => {
    switch (action.type) {
        case SET_AUTH:
            return {
                ...state,
                registered: action.registered,
                email: action.email,
                idToken: action.idToken,
                localId: action.localId,
                expiresIn: action.expiresIn,
                refreshToken: action.refreshToken
            }

        default:
            return state
    }
}
