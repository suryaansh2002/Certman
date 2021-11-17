// import "./App.css";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Redirect,
// } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import Home from "./components/Home/Home";
// import Login from "./components/Login/Login";
// import ForgotPassword from "./components/Forgot/ForgotPassword";
// import ResetPassword from "./components/Forgot/ResetPassword";
// import Generate from "./components/Generate/Generate";
// import SingleImage from "./components/SingleImage/SingleImage";

// function App() {
//   const [cookie, setCookie, removeCookie] = useCookies<any>(["user"]);
//   return (
//     <div className="App">
//       <Router>
//         <Switch>
//           <Route
//             path="/"
//             exact
//             component={() => <Login cookie={cookie} setCookie={setCookie} />}
//           />

//           <Route
//             path="/reset/:id/:token"
//             exact
//             component={() => <ResetPassword />}
//           />

//           <Route path="/forgot" exact component={() => <ForgotPassword />} />

//           <Route
//             path="/home"
//             render={() =>
//               cookie.user ? (
//                 <Home cookie={cookie} removeCookie={removeCookie} />
//               ) : (
//                 <Redirect to="/" />
//               )
//             }
//           />
//           {cookie.user ? (
//             <Route
//               path="/generate"
//               exact
//               component={() => (
//                 <Generate cookie={cookie} removeCookie={removeCookie} />
//               )}
//             />
//           ) : (
//             <Redirect to="/" />
//           )}
//           <Route
//             path="/single-image/:_id"
//             exact
//             component={() => <SingleImage />}
//           />
//         </Switch>
//       </Router>
//     </div>
//   );
// }

// export default App;
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./Config/routes";
import { AuthProvider } from "./Context";
import AppRoute from "./Components/AppRoute";

function App() { 
  return (
	<div className="App">

      <AuthProvider>
        <Router>
          <Switch>
            {routes.map((route) => {
              return (
                <AppRoute
                  key={route.path}
                  path={route.path}
                  component={route.component}
                  isPrivate={route.isPrivate}
                />
              );
            })}
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
