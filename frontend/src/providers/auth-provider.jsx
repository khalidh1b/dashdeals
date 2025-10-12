import {GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth';
import { app } from '@/firebase/firebase.config.js';
import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useAxiosPublic from '@/hooks/access/useAxiosPublic.js';

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();

    //creating new user
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const profileUpdate = (name) => {
        return updateProfile(auth.currentUser, {
            displayName: name
        })
    };

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
        return sendPasswordResetEmail(auth, email)
    }

    //observe current user
    useEffect(() => {
        const onSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            
            if(currentUser) {
                try {
                    const userInfo = {email: currentUser.email};
                    const res = await axiosPublic.post('/auth/jwt', userInfo)
                    
                    if(res?.data?.token) {
                        localStorage.setItem('dashdeals-access-token', res?.data?.token);
                    } else {
                        localStorage.removeItem('dashdeals-access-token');
                    }
                } catch (error) {
                    console.error('Jwt error:', error);
                }
            } else {
                localStorage.removeItem('dashdeals-access-token');
            }

            setLoading(false);
            console.log('current user:', currentUser);
        })

        return () => {
            onSubscribe();
        };
    }, [axiosPublic])

    const authInfo = {
        createUser,
        googleSignIn,
        user,
        signIn,
        forgetPassword,
        logOut,
        profileUpdate,
        loading
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