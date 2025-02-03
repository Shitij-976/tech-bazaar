/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContextProvider';
import Swal from 'sweetalert2';

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(UserContext);

    const handleRedirect = async () => {
        // Show SweetAlert
        await Swal.fire({
            title: 'You must be logged in!',
            text: 'Please log in to continue.',
            icon: 'warning',
            timer: 1500, // 1 second
            showConfirmButton: false,
        });
    };

    if (!user) {
        handleRedirect();
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
