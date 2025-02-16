import React, { useState } from 'react';
import { auth, db, googleProvider } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Store user details in Firestore
            await setDoc(doc(db, "users", user.uid), {
                name,
                email,
                uid: user.uid,
                role: ["student"],
                createdAt: new Date()
            });

            navigate('/dashboard'); // Redirect after signup
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            const userCredential = await signInWithPopup(auth, googleProvider);

            const user = userCredential.user;

            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            // Check if user already exists before setting data
            if (!userSnap.exists()) {
                await setDoc(userRef, {
                    name: user.displayName || "Anonymous",
                    email: user.email,
                    uid: user.uid,
                    role: ["student"],
                    createdAt: new Date(),
                });
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
                    <h2 className="text-center">Sign Up</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSignUp}>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                        <button type="button" className="btn btn-danger w-100 mt-2" onClick={handleGoogleSignUp}>
                            Continue with Google
                        </button>
                    </form>
                    <p className="mt-3 text-center">
                        Already have an account? <a href="/auth/login">Login</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
