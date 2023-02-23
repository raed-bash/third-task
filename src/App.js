import React from "react";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./components/home";
import Layout from "./components/layout";
import Users from "./components/users/users";
import EditOrCreateUser from "./components/users/edit_create_user";
import Login from "./components/login";
import { useSelector } from "react-redux";
import { loggedInSelect } from "./login_slice";

function App() {
  const loggedIn = useSelector(loggedInSelect);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: (
        <>
          <h1>Not found</h1>
          <Link to={"/"}>go to Home</Link>
        </>
      ),

      children: [
        { path: "users", element: <Users /> },
        {
          path: "/",
          index: <Home />,
          element: <Home />,
        },
        ...(loggedIn
          ? [
              {
                path: "edit-create-user/:id",
                element: <EditOrCreateUser />,
              },
              { path: "edit-create-user", element: <EditOrCreateUser /> },
            ]
          : [{ path: "/login", element: <Login /> }]),
      ],
    },
  ]);
  return <RouterProvider router={router} />;

  // <BrowserRouter>
  //   <Routes>
  //     <Route path="/" element={<Layout />}>
  //       <Route index element={<Home />}></Route>
  //       <Route path="users" element={<Users />}></Route>
  //       {loggedIn ? (
  //         <>
  //           <Route
  //             path="edit-create-user/:id"
  //             element={<EditOrCreateUser />}
  //           ></Route>
  //           <Route
  //             path="edit-create-user"
  //             element={<EditOrCreateUser />}
  //           ></Route>
  //         </>
  //       ) : (
  //         <>
  //           <Route path="login" element={<Login />}></Route>
  //         </>
  //       )}
  //     </Route>
  //     <Route
  //       path="*"
  //       element={
  //         <>
  //           <h1>Not found</h1>
  //           <Link to={"/"}>go to Home</Link>
  //         </>
  //       }
  //     />
  //   </Routes>
  // </BrowserRouter>
}

export default App;
