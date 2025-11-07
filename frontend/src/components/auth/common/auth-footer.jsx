import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import './style.css';

export const AuthFooter = ({ text, linkText, linkTo }) => {
    return (
        <div className="auth-footer poppins">
            <p className="auth-footer-paragraph">
                {text}
            </p>
            <Link 
                to={linkTo} 
                className="auth-footer-link">
                    {linkText}
            </Link>
        </div>
    );
};

AuthFooter.propTypes = {
    text: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    linkTo: PropTypes.string.isRequired
};