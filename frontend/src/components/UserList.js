import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

const UserList = () => {
const [users, setUser] = useState([]);

useEffect(()=>{
  getUsers();
},[])

const getUsers = async () =>{
  const response = await axios.get('http://localhost:5000/users');
  setUser(response.data)
}

const deleteUser = async (id) =>{
  // try {
  //     await axios.delete(`http://localhost:5000/users/${id}`);
  //     getUsers();
  // } catch (error) {
  //     console.log(error);
  // }

  try {
    const confirmation = window.confirm('Apakah anda yakin ingin menghapus data ini?');
    if (confirmation) {
      await axios.delete(`http://localhost:5000/users/${id}`);
      getUsers();
      console.log('Berhasil menghapus data');
    } else {
      console.log('Penghapusan pengguna dibatalkan');
    }
  } catch (error) {
    if (error.response) {
      alert(error.response.data.msg);
    } else {
      console.log(error);
    }
  }
}

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <Link to={`add`} className="button is-small is-success">Add New</Link>
        <table className="table is-staped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>
                  <Link to={`edit/${user.id}`} className='button is-small is-info'>Edit</Link>
                  <button onClick={()=> deleteUser(user.id)} className='button is-small is-danger ml-1'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserList