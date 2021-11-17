const ROOT_URL = "http://localhost:5000";

export async function loginUser(dispatch, loginPayload) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginPayload),
  };

  try {
    dispatch({ type: "REQUEST_LOGIN" });
    let response = await fetch(`${ROOT_URL}/api/auth/login`, requestOptions);
    let res = await response.json();

    console.log(res.data);
    console.log(res.status);

    if (res.status == "success") {
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data,
        status: res.status,
      });

      return res;
    }

    dispatch({ type: "LOGIN_ERROR", error: res.error });
    console.log(res.error);
    return;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
    console.log(error);
  }
}

export async function signUpUser(dispatch, signUpPayload) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(signUpPayload),
  };

  try {
    dispatch({ type: "REQUEST_SIGNUP" });
    let response = await fetch(`${ROOT_URL}/api/auth/signup`, requestOptions);
    let res = await response.json();

    console.log(res.data);
    console.log(res.status);

    if (res.status == "success") {
      dispatch({ type: "SIGNUP_SUCCESS" });
      return res.status;
    }

    dispatch({ type: "SIGNUP_ERROR", error: res.error });
    console.log(res.error);
    return;
  } catch (error) {
    dispatch({ type: "SIGNUP_ERROR", error: error });
    console.log(error);
  }
}

export async function logOut(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
}
