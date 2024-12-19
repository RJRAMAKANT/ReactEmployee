import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'; // Import sweetalert2
import withReactContent from 'sweetalert2-react-content'; 
import axios from "axios"; // Don't forget to import axios

const RegistrationForm = () => {
  const MySwal = withReactContent(Swal);
  const [formData, setFormData] = useState({
    fullname: "",
    emailid: "",
    password: "",
    mobile: "",
    address: "",
    gender: "", // Added gender field
    usetype: "", // Added usetype field
  });

  const [errors, setErrors] = useState({
    fullname: "",
    emailid: "",
    password: "",
    mobile: "",
    address: "",
    gender: "",
    usetype: "", // Added usetype error
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    if (type === "radio") {
      setFormData({
        ...formData,
        [id]: value, // Dynamically update gender or usetype
      });
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };

  const validate = () => {
    let formErrors = {};
    let isValid = true;

    // fullname validation
    if (!formData.fullname.trim()) {
      formErrors.fullname = "Fullname is required.";
      isValid = false;
    }

    // emailid validation
    const emailidPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.emailid.trim() || !emailidPattern.test(formData.emailid)) {
      formErrors.emailid = "Please enter a valid emailid.";
      isValid = false;
    }

    // mobile number validation
    if (!formData.mobile) {
      formErrors.mobile = "Mobile number is required.";
      isValid = false;
    }

    // address validation
    if (!formData.address) {
      formErrors.address = "Address is required.";
      isValid = false;
    }

    // gender validation
    if (!formData.gender) {
      formErrors.gender = "Please select a gender.";
      isValid = false;
    }

    // usetype validation
    if (!formData.usetype) {
      formErrors.usetype = "Please select a User Type.";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      formErrors.password = "Password is required.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    const isValid = validate();

    if (isValid) {
      try {
       const response = await axios.post('http://localhost:8080/user/createuser', formData);
 

        if (response.status === 200) {
          // Show SweetAlert for success
          await MySwal.fire({
            title: 'Success!',
            text: 'Your account has been created.',
            icon: 'success',
            confirmButtonText: 'OK',
            customClass: {
              confirmButton: 'custom-confirm-button',
            },
          });

          // Optionally, you can reset the form or take other actions
          setFormData({
            fullname: '',
            emailid: '',
            password: '',
            mobile: '',
            address: '',
            gender: '',
            usetype: '',
          });
        }
      } catch (error) {
        // Show SweetAlert for error
        await MySwal.fire({
          title: 'Error!',
          text: 'Something went wrong, please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'custom-confirm-button',
          },
        });
      }
    } else {
      // Show SweetAlert for error
      await MySwal.fire({
        title: 'Error!',
        text: 'Please fix the errors and try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'custom-confirm-button',
        },
      });
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-800 to-blue-900 flex items-center justify-center min-h-screen p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full animate-fade-in">
        <h2 className="text-2xl font-bold text-center text-indigo-800 mb-8">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Full Name Field */}
          <div>
            <label htmlFor="fullname" className="block text-indigo-900 font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.fullname ? "border-red-500" : "border-gray-200"} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800 transition-all duration-300`}
              placeholder="Enter your Full Name"
              required
            />
            {errors.fullname && <p className="text-red-500 text-sm mt-2">{errors.fullname}</p>}
          </div>

          {/* Email ID Field */}
          <div>
            <label htmlFor="emailid" className="block text-indigo-900 font-semibold mb-2">
              Email ID
            </label>
            <input
              type="email"
              id="emailid"
              value={formData.emailid}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.emailid ? "border-red-500" : "border-gray-200"} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800 transition-all duration-300`}
              placeholder="Enter your emailid"
              required
            />
            {errors.emailid && <p className="text-red-500 text-sm mt-2">{errors.emailid}</p>}
          </div>

          {/* Mobile Field */}
          <div>
            <label htmlFor="mobile" className="block text-indigo-900 font-semibold mb-2">
              Mobile
            </label>
            <input
              type="text"
              id="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.mobile ? "border-red-500" : "border-gray-200"} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800 transition-all duration-300`}
              placeholder="Enter your Mobile number"
              required
            />
            {errors.mobile && <p className="text-red-500 text-sm mt-2">{errors.mobile}</p>}
          </div>

          {/* Address Field */}
          <div>
            <label htmlFor="address" className="block text-indigo-900 font-semibold mb-2">
              Address
            </label>
            <textarea
              id="address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.address ? "border-red-500" : "border-gray-200"} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800 transition-all duration-300`}
              placeholder="Enter your address"
              required
            />
            {errors.address && <p className="text-red-500 text-sm mt-2">{errors.address}</p>}
          </div>

          {/* Gender Field */}
          <div>
            <label className="block text-indigo-900 font-semibold mb-2">Gender</label>
            <div className="flex items-center space-x-4">
              <label>
                <input
                  type="radio"
                  id="gender"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                  required
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  id="gender"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                  required
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  id="gender"
                  name="gender"
                  value="other"
                  checked={formData.gender === "other"}
                  onChange={handleChange}
                  required
                />
                Other
              </label>
            </div>
            {errors.gender && <p className="text-red-500 text-sm mt-2">{errors.gender}</p>}
          </div>

          {/* Use Type Field */}
          <div>
            <label className="block text-indigo-900 font-semibold mb-2">Use Type</label>
            <div className="flex items-center space-x-4">
              <label>
                <input
                  type="radio"
                  id="usetype"
                  name="usetype"
                  value="USER"
                  checked={formData.usetype === "USER"}
                  onChange={handleChange}
                  required
                />
                USER
              </label>
              <label>
                <input
                  type="radio"
                  id="usetype"
                  name="usetype"
                  value="ADMIN"
                  checked={formData.usetype === "ADMIN"}
                  onChange={handleChange}
                  required
                />
                ADMIN
              </label>
            </div>
            {errors.usetype && <p className="text-red-500 text-sm mt-2">{errors.usetype}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-indigo-900 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.password ? "border-red-500" : "border-gray-200"} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800 transition-all duration-300`}
              placeholder="Enter your password"
              required
            />
            {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-800 text-white py-3 rounded-lg font-semibold hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02]"
          >
            Register
          </button>
        </form>

        {/* Sign In Link */}
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-indigo-800 font-semibold hover:text-blue-900 transition-colors duration-300"
          >
            Sign In
          </Link>
        </p>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default RegistrationForm;
