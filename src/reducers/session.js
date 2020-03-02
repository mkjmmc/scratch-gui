import cookies from 'js-cookie';

const SET_SESSION = 'session/SET_SESSION';
const SIGN_OUT = 'session/SIGN_OUT';

const initialState = null;

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
        case SET_SESSION:
            // console.log(action.session)
            return action.session;
        case SIGN_OUT:
            cookies.remove('authorization');
            // window.location.href = window.location.href;
            return null;
        default:
            return state;
    }
};
const setSession = session => ({
    type: SET_SESSION,
    session: session
});

const signOut = () =>({
    type: SIGN_OUT,
});

export {
    reducer as default,
    initialState as sessionInitialState,
    setSession,
    signOut
};
