import './login-form.css';

const LoginForm = ({category}) => {
    return (
        <>
        <div className='topbar'></div>
        <div className='login'>
            <img src='/images/logo.svg' alt='felt teachers logo' />
            <h1 className='purple'>LOGIN</h1>
            <p>SIGN IN WITH YOUR {category.toUpperCase()} ACCOUNT</p>
            <form>
                <label>
                    <input type='email' name='email' id='email' placeholder='Email...'/>
                </label>
                <label>
                    <input type='password' name='password' id='password' placeholder='Password'/>
                </label>
                <input type='submit' value='LOGIN' id='submit' className='button'/>
                <label className='purple'>
                    <input type='checkbox' name='remember' id='remember' />
                    Keep me signed in
                </label>
            </form>
            <p className='button-container'><a href='/'>FORGOT PASSWORD</a></p>
            <div className='button-container'><a href='/' className='button'>Create a {category} account</a></div>
            </div>
            </>
    )
}

export default LoginForm;