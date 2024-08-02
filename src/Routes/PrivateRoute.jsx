import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <progress className="progress w-56"></progress>;
    }
    if (user) {
        return children;
    }
    return (
        <div>
            <Navigate to='/login' state={{ from: location }} replace />
        </div>
    );
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PrivateRoute;
