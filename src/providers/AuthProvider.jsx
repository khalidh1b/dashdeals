import {getAuth} from 'firebase/auth';
import app from '../firebase/firebase.config';

const auth = getAuth(app);
const AuthProvider = () => {
    return (
        <div>
            
        </div>
    );
};

export default AuthProvider;