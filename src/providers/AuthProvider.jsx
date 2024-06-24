import {GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth';
import app from '../firebase/firebase.config';
import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useAxiosPublic from '../hooks/useAxiosPublic';



export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();

    //creating new user
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    //sign in existing user
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    //sign in with google popup
    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider)
    }

    //user logOut
    const logOut = () => {
        return signOut(auth)
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    //forget password
    const forgetPassword = (email) => {
        sendPasswordResetEmail(auth, email)
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    //observe current user
    useEffect(() => {
        const onSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if(currentUser) {
                const userInfo = {email: currentUser.email};
                axiosPublic.post('/jwt', userInfo)
                .then((res) => {
                    if(res.data.token) {
                        localStorage.setItem('access-token', res.data.token);
                    }
                    else {
                        localStorage.removeItem('access-token');
                    }

                })
                .catch((error) => {
                    console.log(error);
                })
            }
        console.log('current user:', currentUser);
        })
        return () => {
            onSubscribe();
        }
    }, [axiosPublic])

    const authInfo = {
        createUser,
        googleSignIn,
        user,
        signIn,
        forgetPassword,
        logOut,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;