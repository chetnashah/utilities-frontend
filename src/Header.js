import React from 'react'
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            <Link to="/fileTester">Test Files</Link>
        </div>
    )
}
