import React, { useState } from 'react';
import { auth, db, googleProvider } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            const user = userCredential.user;

            // Retrieve user details from Firestore
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                console.log("User Data:", userDoc.data());
            } else {
                console.log("No user data found");
            }


            navigate('/dashboard'); // Redirect after login
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const userCredential = await signInWithPopup(auth, googleProvider);
            const user = userCredential.user;

            // Retrieve user details from Firestore
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                console.log("User Data:", userDoc.data());
            } else {
                console.log("No user data found");
            }


            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <h2 className="text-center">Login</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                        <button type="button" className="btn btn-danger w-100 mt-2" onClick={handleGoogleLogin}>
                            Continue with Google
                        </button>
                    </form>
                    <p className="mt-3 text-center">
                        Dont have an account? <a href="/auth/sign-up">Sign Up</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
