import PropTypes from 'prop-types';

export const AuthHeader = ({ title, subtitle }) => {
    return (
        <>
            <h3 className="auth-header-title">{title}</h3>
            <h5 className="auth-header-subtitle poppins">{subtitle}</h5>
        </>
    );
};

AuthHeader.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired
};