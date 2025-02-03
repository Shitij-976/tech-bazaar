import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContextProvider';
import Swal from 'sweetalert2'; // Import SweetAlert2

const Login = () => {
    const { login } = useContext(UserContext);
    const navigate = useNavigate();
    const [openForgetPassword, setOpenForgetPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [resetPasswordData, setResetPasswordData] = useState({
        email: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleResetPasswordChange = (e) => {
        setResetPasswordData({
            ...resetPasswordData,
            [e.target.name]: e.target.value
        });
    };

    const setCookie = (name, value, days) => {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:8000/api/user/login', formData, {
                withCredentials: true
            });
            if (response.status === 200) {
                const { token, user } = response.data;
                login(user, token); // Save the token and user data to context
                setCookie('token', token, 2); // Save the token cookies
                setCookie('user', user, 2); // Save the user data to cookies
                
                // Show success alert
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful!',
                    text: 'Welcome back!',
                    confirmButtonText: 'OK'
                }).then(() => {
                    navigate('/'); // Navigate to home after success
                });

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Please check your credentials and try again.',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
                confirmButtonText: 'OK'
            });
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (resetPasswordData.newPassword !== resetPasswordData.confirmPassword) {
            Swal.fire({
                icon: 'warning',
                title: 'Password Mismatch',
                text: 'Please ensure both passwords match.',
                confirmButtonText: 'OK'
            });
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/user/forgot-password', {
                email: resetPasswordData.email,
                password: resetPasswordData.newPassword,
            });

            if (response.status === 200) {
                console.log('Password reset successful');
                Swal.fire({
                    icon: 'success',
                    title: 'Password Reset Successful!',
                    text: 'You can now log in with your new password.',
                    confirmButtonText: 'OK'
                }).then(() => {
                    setOpenForgetPassword(false);
                    setResetPasswordData({
                        email: '',
                        newPassword: '',
                        confirmPassword: ''
                    });
                    navigate('/login'); // Redirect to login
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Password Reset Failed',
                    text: 'Please try again later.',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
                confirmButtonText: 'OK'
            });
            console.error('Password reset error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="relative h-screen">
                {openForgetPassword ? (
                    <div className="absolute top-[40%] left-[30%] flex flex-col justify-center -mt-32">
                        <span className="text-4xl font-bold">Reset your password</span><br />
                        <input
                            className="outline-none py-2 rounded-md pl-1"
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={resetPasswordData.email}
                            onChange={handleResetPasswordChange}
                            autoFocus
                            required
                        /><br />
                        <input
                            className="outline-none py-2 rounded-md pl-1"
                            type="password"
                            name="newPassword"
                            placeholder="New password"
                            value={resetPasswordData.newPassword}
                            onChange={handleResetPasswordChange}
                            required
                        /><br />
                        <input
                            className="outline-none py-2 rounded-md pl-1"
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            value={resetPasswordData.confirmPassword}
                            onChange={handleResetPasswordChange}
                            required
                        /><br />
                        <div className="flex gap-3">
                            <button
                                className="bg-orange-500 rounded text-white p-1"
                                onClick={handlePasswordReset}
                                disabled={loading}
                            >
                                {loading ? 'Resetting...' : 'Save Changes'}
                            </button>
                            <button
                                className="hover:bg-orange-500 border border-orange-500 text-orange-600 hover:text-white rounded p-1"
                                onClick={() => setOpenForgetPassword(false)}
                            >
                                Cancel
                            </button>
                        </div>
                        {error && <div className="text-red-500 mt-2">{error}</div>}
                    </div>
                ) : (
                    <div className="flex items-center justify-center min-h-screen w-full">
                        <div className="flex flex-col items-left justify-center -mt-32 ml-40">
                            <span className="text-4xl font-bold">Log in to Tech Bazaar</span><br />
                            <span>Enter your details below</span><br />
                            <form onSubmit={handleSubmit} className="flex flex-col">
                                <input
                                    className="outline-none py-2 rounded-md pl-1"
                                    type="email"
                                    placeholder="Email or Phone Number"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoFocus
                                    required
                                /><br />
                                <input
                                    className="outline-none py-2 rounded-md pl-1"
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                /><br />
                                <div className="flex justify-between">
                                    <button type="submit" className="bg-orange-500 rounded text-white p-1" disabled={loading}>
                                        {loading ? 'Logging in...' : 'Log in'}
                                    </button>
                                    <div
                                        className="text-orange-500 cursor-pointer"
                                        onClick={() => setOpenForgetPassword(!openForgetPassword)}
                                    >
                                        Forget Password?
                                    </div><br />
                                </div>
                            </form>
                            <div className="mt-4">
                                Don&apos;t have an Account
                                <span className="px-1 underline underline-offset-2 cursor-pointer font-thin">
                                    <Link to='/sign_up'>Register Now</Link>
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Login;
