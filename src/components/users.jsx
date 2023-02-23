import React, { useEffect, useState } from "react"

export default function Users() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch('http://localhost:8080/users')
            .then(resp => resp.json())
            .then(jsonUsers => {
                // console.log(jsonUsers);
                setUsers(jsonUsers)
            });
    }, [])

    return (
        <React.Fragment>
            <h3>Users</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.length > 0 && users.map((user) => (
                        <tr key={user.username}>
                            <td>{user.username}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </React.Fragment>
    )
}