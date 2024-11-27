import React,{useEffect, useState} from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [gender, setGender] = useState("Male");
const navigate = useNavigate();
const {id} = useParams();

useEffect(() => {
  getUserById();
}, []);

const updateUser = async (e) =>{
  e.preventDefault();
  try {
      await axios.patch(`http://localhost:5000/users/${id}`,{
        name,
        email,
        gender
      });
      navigate("/");
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async () =>{
  const response = await axios.get(`http://localhost:5000/users/${id}`);
  setName(response.data.name);
  setEmail(response.data.email);
  setGender(response.data.gender);
};

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={updateUser}>
          <div className="field">
            <div className="label">Name</div>
            <div className="control">
              <input type="text" className="input" value={name} onChange={(e)=> setName(e.target.value)} placeholder='Name'/>
            </div>
          </div>
          <div className="field">
            <div className="label">Email</div>
            <div className="control">
              <input type="text" className="input" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Email'/>
            </div>
          </div>
          <div className="field">
            <div className="label">Gender</div>
            <div className="control">
              <div className="select is-fullwidth">
                <select value={gender} onChange={(e)=> setGender(e.target.value)}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <button className="submit button is-success">Update</button>
            <Link to={`/`} className="submit button is-danger ml-1">Back</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditUser