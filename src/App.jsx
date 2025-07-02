import React, { useState } from 'react';
import { Eye, EyeOff, Upload } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    uploadfile: null,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleFileChange = (e) => {
    setValues({ ...values, uploadfile: e.target.files[0] });
  };

  // ✅ Custom validation function
  const validateInputs = () => {
    const usernameRegex = /^[A-Za-z0-9]{3,16}$/;
    const emailRegex = /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,4}$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

    if (!values.username.trim()) {
      toast.error("Username is required");
      return false;
    }
    if (!usernameRegex.test(values.username)) {
      toast.error("Username must be 3-16 characters, no special symbols");
      return false;
    }

    if (!values.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!emailRegex.test(values.email)) {
      toast.error("Invalid email format");
      return false;
    }

    if (!values.password) {
      toast.error("Password is required");
      return false;
    }
    if (!passwordRegex.test(values.password)) {
      toast.error("Password must be 8-20 chars, include letter, number & special char");
      return false;
    }

    if (values.password !== values.confirmpassword) {
      toast.error("Passwords do not match");
      return false;
    }

    if (!values.uploadfile) {
      toast.error("Please upload your profile image");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    const formData = new FormData();
    formData.append('username', values.username);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('confirmpassword', values.confirmpassword);
    formData.append('file', values.uploadfile);

   

    console.log(Object.fromEntries(formData.entries()));
    toast.success("Registration Successful!");
  };

  return (
    <div className="min-h-screen bg-[#eae1df] flex items-center justify-center p-4">
      <Toaster />
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md w-full max-w-md shadow-md space-y-4">
        <h1 className="text-2xl font-bold">Registration form</h1>

        {/* Username */}
        <div>
          <label className="block font-semibold">Username:</label>
          <input
            type="text"
            name="username"
            placeholder="Enter Your Username"
            className="w-full p-3 rounded-md border mt-1 focus:outline-none"
            value={values.username}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold">Email Address:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email Address"
            className="w-full p-3 rounded-md border mt-1 focus:outline-none"
            value={values.email}
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div>
          <label className="block font-semibold">Password:</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter Your Password"
              className="w-full p-3 rounded-md border mt-1 focus:outline-none"
              value={values.password}
              onChange={handleChange}
            />
            <span className="absolute right-3 top-4 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block font-semibold">Re-enter Password:</label>
          <input
            type="password"
            name="confirmpassword"
            placeholder="Re-enter Your Password"
            className="w-full p-3 rounded-md border mt-1 focus:outline-none"
            value={values.confirmpassword}
            onChange={handleChange}
          />
        </div>

        {/* Upload File */}
        <div>
          <label className="block font-semibold">Upload Your Profile</label>
          <div className="flex items-center gap-2 mt-1">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 rounded-md border"
            />
          </div>
          {values.uploadfile && (
             <img
             src={URL.createObjectURL(values.uploadfile)}
             alt="Uploaded Preview"
             className="w-40 h-40 object-cover rounded-md mt-2 border"
           />
          )}
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold mt-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;
