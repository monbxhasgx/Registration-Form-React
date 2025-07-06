import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';

const Update = () => {
  const { id } = useParams(); // Get user index from URL
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const [users, setUsers] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    image: "",
    uploadfile: null,
  });

  // Load users from localStorage and set the selected user's data
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);

    const user = storedUsers[id];
    if (user) {
      setValues({
        username: user.username,
        email: user.email,
        password: user.password,
        image: user.image,
        uploadfile: null,
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setValues({ ...values, uploadfile: file });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    // If a new image is uploaded, convert to base64
    if (values.uploadfile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        saveUpdatedUser(reader.result); // New image in base64
      };
      reader.readAsDataURL(values.uploadfile);
    } else {
      saveUpdatedUser(values.image); // Keep existing image
    }
  };

  const saveUpdatedUser = (imageBase64) => {
    const updatedUser = {
      username: values.username,
      email: values.email,
      password: values.password,
      image: imageBase64,
    };

    const updatedUsers = [...users];
    updatedUsers[id] = updatedUser;

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    toast.success("User updated successfully!");
    navigate("/"); // back to user list
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <form
        onSubmit={handleUpdate}
        className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold">Update User</h2>

        <input
          type="text"
          name="username"
          value={values.username}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          placeholder="Username"
        />

        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          placeholder="Email"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={values.password}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            placeholder="Password"
          />
          <span
            className="absolute right-3 top-4 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="w-full p-2 border rounded"
        />

        {values.uploadfile ? (
          <img
            src={URL.createObjectURL(values.uploadfile)}
            alt="Preview"
            className="w-24 h-24 object-cover rounded mt-2 border"
          />
        ) : (
          values.image && (
            <img
              src={values.image}
              alt="Preview"
              className="w-24 h-24 object-cover rounded mt-2 border"
            />
          )
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          Update User
        </button>
      </form>
    </div>
  );
};

export default Update;
