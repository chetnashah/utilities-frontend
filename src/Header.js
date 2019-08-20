import React from 'react'
import { Link } from 'react-router-dom';
import { logMeInWithGoogle } from './firebaseAuthSetup';

export default function Header() {
    return (
        <div>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            <Link to="/fileTester">Test Files</Link>
            <button onClick={() => { logMeInWithGoogle(); }}>Login via google</button>
        </div>
    )
}
