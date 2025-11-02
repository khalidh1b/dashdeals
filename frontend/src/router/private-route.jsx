import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AuthContext } from '@/app/providers/auth-provider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    
    //console.log('Private route loading:', loading);
    if (loading) {
        return <progress className="progress w-56"></progress>;
    }
    if (user) {
        //console.log('Private route user:', user);
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
