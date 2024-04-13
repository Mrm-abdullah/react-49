import { useState } from "react";
import app from "../firebase/firebase.init";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, GithubAuthProvider, signInWithEmailAndPassword } from "firebase/auth";


const Login = () => {
    const auth = getAuth(app);

    const provider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const [user, setUser] = useState(null)


    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
                const user = result.user;
                setUser(user)
                console.log(user);
            })
            .catch((error) => {
                // Handle Errors here.
                // const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                // const email = error.customData.email;
                // The AuthCredential type that was used.
                // const credential = GoogleAuthProvider.credentialFromError(error);
                console.log(errorMessage);

            });
    }
    const handleGithubSignIn = () => {
        const auth = getAuth();
        signInWithPopup(auth, githubProvider)
            .then((result) => {
                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                // const credential = GithubAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;

                // The signed-in user info.
                const user = result.user;
                setUser(user)
                console.log(user);
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // // Handle Errors here.
                // const errorCode = error.code;
                // const errorMessage = error.message;
                // // The email of the user's account used.
                // const email = error.customData.email;
                // // The AuthCredential type that was used.
                // const credential = GithubAuthProvider.credentialFromError(error);
                console.log(error);
                // ...
            });
    }

    const logOutbtnn = () => {
        signOut(auth)
            .then((result) => {
                console.log(result);
                setUser(null)
            })
            .catch((error) => {
                console.log(error);
            });
    }



    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [show, setShow] = useState(false)
    const loginForm = e => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        setError('')
        setSuccess('')
        if (password.length < 6) {
            setError('Password should be at least 6 characters (auth/weak-password).')
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setError('please provide 1 upper case')
            return;
        }
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                setUser(user)
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
        <div className="text-center">
            <div className="hero bg-base-200 my-10">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card shrink-0 w-full shadow-2xl bg-base-100">
                        <form onSubmit={loginForm} className="card-body">
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
            <button className="btn" onClick={handleGoogleSignIn}>google</button>
            <button className="btn" onClick={handleGithubSignIn}>github</button>
            {
                user && <div>
                    <h3>User : {user.displayName}</h3>
                    <p>Email: {user.email} </p>
                    <img src={user.photoURL} alt="" />
                    <button onClick={logOutbtnn}>Logout</button>
                </div>
            }
        </div>
    );
};

export default Login;