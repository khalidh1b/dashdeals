import PropTypes from 'prop-types';
import useForgetPass from "@/hooks/auth/useForgetPass";
import PassResetForm from "@/components/auth/pass-reset-form/PassResetForm";
import './style.css';

export const AuthForm = ({ onSubmitFn, loading, submitText, fields, isLoginForm }) => {
    const { handleForgetPass } = useForgetPass();

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
                    
                    {isLoginForm && <PassResetForm handleForgetPass={handleForgetPass}/>}
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
    handleSignup: PropTypes.func,
    loading: PropTypes.bool
};