import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Function to check for weak passwords
    const isWeakPassword = (password) => {
        // Criteria for a strong password
        const minLength = 8;
        const hasNumber = /\d/; // Checks if there is a number
        const hasLetter = /[a-zA-Z]/; // Checks if there is a letter
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/; // Checks for special characters

        if (password.length < minLength || 
            !hasNumber.test(password) || 
            !hasLetter.test(password) || 
            !hasSpecialChar.test(password)) {
            return true; // Password is weak
        }
        return false; // Password is strong
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if the password is weak
        if (isWeakPassword(formData.password)) {
            // Show warning alert if the password is weak
            Swal.fire({
                icon: 'warning',
                title: 'Weak Password',
                text: 'Your password must be at least 8 characters long, include numbers, letters, and special characters.',
                confirmButtonText: 'OK'
            });
            return; // Stop submission if password is weak
        }

        try {
            const response = await axios.post('http://localhost:8000/api/user/signup', formData, {
                withCredentials: true
            });
            console.log('Signup successful!', response.data);

            // Show success alert
            Swal.fire({
                icon: 'success',
                title: 'Signup Successful!',
                text: 'Your account has been created successfully. You can log in now.',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/login'); // Redirect to login after success
            });

        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Signup failed. Please try again.';
            console.error('Signup error:', error);
            
            // Show error alert
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen w-full">
            <div className="flex flex-col items-left justify-center max-w-[40rem] min-w-fit -mt-40 ml-40 shadow-md shadow-orange-400 px-4 py-10">
                <span className="text-4xl font-bold">Create an account</span><br />
                <span>Enter your details below</span><br />
                <form onSubmit={handleSubmit} className='flex flex-col'>
                    <input
                        className="outline-none"
                        type="text"
                        placeholder="User Name"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        autoFocus
                        required
                    /><br />
                    <input
                        className="outline-none"
                        type="email"
                        placeholder="Email or Phone Number"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    /><br />
                    <input
                        className="outline-none"
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    /><br />
                    <button type="submit" className="bg-orange-500 rounded text-white p-1">
                        Create Account
                    </button><br />
                </form>
                <span>Already have an account? <a href="/login">Log in</a></span>
            </div>
        </div>
    );
};

export default Signup;
