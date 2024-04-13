
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../firebase/firebase.init";
import { useState } from "react";



const Reguster = () => {
    const auth = getAuth(app);
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [show, setShow] = useState(false)
    const registerForm = e => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        setError('')
        setSuccess('')
        if (password.length<6) {
            setError('Password should be at least 6 characters (auth/weak-password).')
            return;
        }
        else if (!/[A-Z]/.test(password)){
            setError('please provide 1 upper case')
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                setSuccess('User Successfully add')
            })
            .catch((error) => {
                // const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                setError(errorMessage)
            });
    }
    const showHide = () => {
        setShow(!show)
    }
    return (
        <div className="hero bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card shrink-0 w-full shadow-2xl bg-base-100">
                    <form onSubmit={registerForm} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" className="input input-bordered" name="email" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type={show ? 'text' : 'password'} placeholder="password" name="password" className="input input-bordered" required /> <span className="btn" onClick={showHide}>Show</span>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
            {
                error && <>{error}</>
            }
            
            {
                success && <>{success}</>
            }
        </div>
    );
};

export default Reguster;