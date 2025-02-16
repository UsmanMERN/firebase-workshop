import React, { useState } from 'react';
import { auth, db, googleProvider } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function Login() {
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
