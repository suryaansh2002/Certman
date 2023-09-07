// let user = localStorage.getItem("currentUser")
//   ? JSON.parse(localStorage.getItem("currentUser")).name
//   : "";
let token = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).token
  : "";

export const initialState = {
  user: "" || JSON.parse(localStorage.getItem("currentUser")),
  token: "" || token,
  loading: false,
  errorMessageLog: null,
  errorMessageSign: null,
  successMessage: null,
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        loading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        user: JSON.parse(localStorage.getItem("currentUser")),
        successMessage: "Logged in Successfully",
        loading: false,
      };
    case "LOGOUT":
      return {
        ...initialState,
        user: "",
        token: "",
      };

    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessageLog: action.error,
        errorMessageSign: "",
      };

    case "REQUEST_SIGNUP":
      return {
        ...initialState,
        loading: true,
      };
    case "SIGNUP_SUCCESS":
      return {
        ...initialState,
        successMessage: "Signed up Successfully",
        loading: false,
        errorMessageLog: "",
        errorMessageSign: "",
      };
    case "SIGNUP_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessageSign: action.error,
        errorMessageLog: "",
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
