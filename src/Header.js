import React from 'react'
import { Link } from 'react-router-dom';
import { logMeInWithGoogle } from './firebaseAuthSetup';
import { observer, inject } from 'mobx-react';

function Header(props) {
    const logOut = () => {
        props.authStore.logout();
    }
    return (
        <div>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            <Link to="/fileTester">Test Files</Link>
            <button onClick={() => { logMeInWithGoogle(); }}>Login via google</button>
            <button onClick={() => {logOut();}}>Logout</button>
        </div>
    )
}

export default inject("authStore")(observer(Header));