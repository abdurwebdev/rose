import React from 'react';

const Login = () => {
    return (
        <div>
            <form action="/login" method="post">
                <input type="text" name="username" placeholder="Username" />
                <input type="password" name="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
            <a href="/register">Register</a>
        </div>
    )
}

export default Login;