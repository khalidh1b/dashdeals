import PropTypes from 'prop-types';
import PassResetForm from "@/component/auth/pass-reset-form/PassResetForm";
import './style.css';

export const AuthForm = ({ onSubmitFn, loading, submitText, fields, isLoginForm }) => {
    
    return (
        <>
            <form onSubmit={onSubmitFn}>
                    {fields.map(({ name, type, classes, placeholder }) => (
                        <label htmlFor={name} key={name}>
                            <input
                                className={classes} 
                                type={type} 
                                name={name}
                                required 
                                placeholder={placeholder}
                            />
                            <br />
                        </label>
                    ))}
                    
                    {isLoginForm && <PassResetForm/>}
                    <br />
                    <button 
                        disabled={loading ? true : false} 
                        className="auth-form-button" 
                        type="submit"
                    >
                        { submitText } {loading && <span className="loading loading-spinner loading-md"></span>}
                    </button>
            </form>
        </>
    );
};

AuthForm.propTypes = {
    onSubmitFn: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    submitText: PropTypes.string.isRequired,
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            classes: PropTypes.string.isRequired,
            placeholder: PropTypes.string.isRequired
        })
    ).isRequired,
    isLoginForm: PropTypes.bool
};