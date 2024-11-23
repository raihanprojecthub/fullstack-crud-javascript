import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  const [photoProfile, setPhotoProfile] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:5000/users/${id}`);
    setName(response.data.name);
    setEmail(response.data.email);
    setGender(response.data.gender);
    setPreview(`http://localhost:5000/${response.data.photoProfile}`);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('gender', gender);
    
    if (photoProfile) {
      formData.append('photoProfile', photoProfile);
    }

    try {
      await axios.patch(`http://localhost:5000/users/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const loadImage = (e) => {
    const file = e.target.files[0];
    setPhotoProfile(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={updateUser}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Gender</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label">Photo Profile</label>
            <div className="control">
              <input type="file" className="input" onChange={loadImage} />
            </div>
          </div>
          {preview && (
            <div className="field">
              <label className="label">Preview</label>
              <img
                src={preview}
                alt="Preview"
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
            </div>
          )}
          <div className="field">
            <button className="submit button is-success">Update</button>
            <Link to={`/`} className="submit button is-danger ml-1">Back</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;