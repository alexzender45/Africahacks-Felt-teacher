import './login-form.css';
import { Link } from 'react-router-dom';

const LoginForm = ({ category }) => {
    return (
        <>
        <div className='topbar'></div>
        <div className='container'>
            <img src='/images/logo.svg' alt='felt teachers logo' />
            <h1 className='purple'>LOGIN</h1>
            <p>SIGN IN WITH YOUR {category.toUpperCase()} ACCOUNT</p>
            <form method='POST'>
                <label>
                    <input type='email' name='email' className='input' placeholder='Email...'/>
                </label>
                <label>
                    <input type='password' name='password' className='input' placeholder='Password'/>
                </label>
                <input type='submit' value='LOGIN' className='button submit'/>
                <label className='purple'>
                    <input type='checkbox' name='remember' id='remember' />
                    Keep me signed in
                </label>
            </form>
            <p className='button-container'><Link to='/recover-password'>FORGOT PASSWORD</Link></p>
            <div className='button-container'><Link to={`/${category}/register`} className='button'>Create a {category} account</Link></div>
            </div>
            </>
    )
}

export default LoginForm;