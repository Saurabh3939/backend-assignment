import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", formData);
      alert("Registration SuccessFull , Please Login");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className='auth-container'>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='FullName'
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type='text'
          placeholder='Email'
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type='password'
          placeholder='Password'
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
        <select
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        >
          <option value='user'>User</option>
          <option value='admin'>Admin</option>
        </select>
        <button type='submit'>SignUp</button>
      </form>
    </div>
  );
};

export default Register;
