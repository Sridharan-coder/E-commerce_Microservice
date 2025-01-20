// import { DELETE, SAVE } from "../Action_Type/ActionType";
// const userData = {
//     authentication: {
//         email: "",
//         first_name: "",
//         last_name: "",
//         loginTime: "",
//         imageurl: "",
//         token: ""
//     }
// }
// export const Reducer = (state = userData, action) => {
//     switch (action.type) {
//         case SAVE:
//             return {
//                 ...state, authentication: {
//                     email: btoa(action.payload.email),
//                     first_name: btoa(action.payload.first_name),
//                     last_name: btoa(action.payload.last_name),
//                     loginTime: action.payload.loginTime,
//                     imageurl: btoa(action.payload.imageurl),
//                     token: btoa((btoa(action.payload.token)))
//                 }
//             }
//         case DELETE:
//             return {
//                 ...state, authentication: {
//                     email: "",
//                     first_name: "",
//                     last_name: "",
//                     token: ""
//                 }
//             };
//         default:
//             return state;
//     }
// };

import { LOGINBUYER, LOGOUTBUYER } from "../Action_Type/ActionType"




const intialData = {
    buyerAuthentication: {
        u_id: "",
        u_name: "",
        u_phoneNumber: "",
        u_emailAddress: "",
        u_password: '',
        u_carts: [],
        u_whitelist: [],
        u_loggedIn: false,
        u_token:""

    }
}

export const Reducer = (state = intialData, action) => {

    switch (action.type) {
        case LOGINBUYER:
            return { ...state, buyerAuthentication: { ...state.buyerAuthentication, ...action.payload, u_loggedIn: true } };
        case LOGOUTBUYER:
            return {
                ...state, buyerAuthentication: {
                    u_id: "",
                    u_name: "",
                    u_phoneNumber: "",
                    u_emailAddress: "",
                    u_password: '',
                    u_carts: [],
                    u_whitelist: [],
                    u_loggedIn: false

                }
            };
        default:
            return state;
    }

}
