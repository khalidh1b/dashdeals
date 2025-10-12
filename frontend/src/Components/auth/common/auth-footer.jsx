import { Link } from "react-router-dom";
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