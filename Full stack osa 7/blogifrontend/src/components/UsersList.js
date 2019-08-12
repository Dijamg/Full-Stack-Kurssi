import React, { useState, useEffect } from 'react'
import userService from '../services/users'
import { Link } from 'react-router-dom'


const UsersList = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService
      .getAll()
      .then(data => setUsers(users.concat(data)))
  }, [])

  return(
    <div>
      <h2>Users</h2>
      <table    >
        <tbody>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
          {users.map(user =>
            <tr key ={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UsersList