import { useState } from "react";
import app from "../firebase/firebase.init";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, GithubAuthProvider } from "firebase/auth";


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
    return (
        <div className="text-center">
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