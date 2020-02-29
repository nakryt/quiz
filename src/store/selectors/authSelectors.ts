import {IAuth, IStore} from "../storeTypes";
import {createSelector} from "reselect";

export const getAuth = (state:IStore):IAuth => state.auth
export const getIsRegistered = createSelector(getAuth, auth => auth.registered)
export const getIdToken = createSelector(getAuth, auth => auth.idToken)
export const getLocalId = createSelector(getAuth, auth => auth.localId)
export const getEmail = createSelector(getAuth, auth => auth.email)
export const getExpiresIn = createSelector(getAuth, auth => auth.expiresIn)


