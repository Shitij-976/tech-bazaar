import { useState } from "react";
import { IoCallOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            // Make the API call to send the message
            await axios.post("http://localhost:8000/api/user/contact", formData);
            setSuccess("Message sent successfully!");

            // Show success alert
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Message sent successfully!',
                confirmButtonText: 'OK'
            });

            // Reset form data
            setFormData({
                name: "",
                email: "",
                phone: "",
                message: "",
            });
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred while sending the message.';
            setError(errorMessage);
            
            // Show error alert
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
                confirmButtonText: 'OK'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-left justify-center min-h-screen mt-40 ml-40 -mb-44">
            <div className="m-1 p-1 rounded">
                <div className="m-1 p-1 ">
                    <div className="flex justify-between">
                        <IoCallOutline className="bg-orange-500 text-white rounded-full p-1" size={40} />
                        <span className="font-bold text-orange-500">Call To Us</span><br />
                    </div>
                    <span>We are available 24/7.</span><br />
                    <span>Phone: +91 9999999999</span><br />
                </div>
                <div className="m-1 p-1">
                    <div className="flex justify-between">
                        <CiMail className="bg-orange-500 text-white rounded-full p-1" size={40} />
                        <span className="font-bold text-orange-500">Write To Us</span><br />
                    </div>
                    <span>Fill out our form and we will contact you within 24 hours.</span><br />
                    <span>Email: techbazaar2025@gmail.com</span><br />
                </div>
            </div>
            <form className="flex flex-col m-1 p-1 rounded" onSubmit={handleSubmit}>
                <input
                    className="bg-gray-100 m-1 p-1 outline-none rounded"
                    type="text"
                    name="name"
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    className="bg-gray-100 m-1 p-1 outline-none rounded"
                    type="email"
                    name="email"
                    placeholder="Your Email *"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    className="bg-gray-100 m-1 p-1 outline-none rounded"
                    type="tel"
                    name="phone"
                    placeholder="Your Phone *"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <input
                    className="bg-gray-100 m-1 p-1 outline-none rounded"
                    type="text"
                    name="message"
                    placeholder="Your message"
                    value={formData.message}
                    onChange={handleChange}
                />
                <button
                    className="bg-orange-500 rounded text-white p-1 m-1"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Send Message"}
                </button>

                {error && <span className="text-red-500">{error}</span>}
                {success && <span className="text-green-500">{success}</span>}
            </form>
        </div>
    );
};

export default Contact;
