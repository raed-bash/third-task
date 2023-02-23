import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loggedInSelect, rolesSelect } from "../../login_slice";
import {
  deleteUserAsync,
  loadUsersAsync,
  selectUsers,
  selectUsersLoaded,
} from "../../users_slice";
import RenderError from "../render_error";

export default function Users() {
  const [errorMessage, setErrorMessage] = useState(null);
  const users = useSelector(selectUsers);
  const loaded = useSelector(selectUsersLoaded);
  const roles = useSelector(rolesSelect);
  const dispatch = useDispatch();
  const loggedIn = useSelector(loggedInSelect);
  useEffect(() => {
    if (!loaded) {
      dispatch(loadUsersAsync());
    }
  }, [dispatch, loaded]);
  return (
    <React.Fragment>
      <h3>Users</h3>
      <RenderError errorMessage={errorMessage} />
      {loggedIn ? (
        <Link to={"/edit-create-user"} className="btn btn-primary pull-right">
          <i className="glyphicon glyphicon-plus"></i> Create
        </Link>
      ) : (
        <></>
      )}

      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.length > 0 &&
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                {loggedIn ? (
                  <>
                    <td>
                      <Link to={`/edit-create-user/${user.id}`}>
                        <i className="glyphicon glyphicon-edit"></i>
                      </Link>
                    </td>
                    {roles.includes("admin") ? (
                      <td>
                        <Link
                          to={""}
                          onClick={() => {
                            dispatch(
                              deleteUserAsync(
                                user.id,
                                () => {},
                                (error) => {
                                  setErrorMessage(error.message);
                                }
                              )
                            );
                          }}
                        >
                          <i className="glyphicon glyphicon-trash"></i>
                        </Link>
                      </td>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </React.Fragment>
  );
}
