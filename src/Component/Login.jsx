import app from "../firebase/firebase.init";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


const Login = () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
                const user = result.user;
                console.log(user);
            }).catch((error) => {
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
    return (
        <div className="text-center">
            <button className="btn" onClick={handleGoogleSignIn}>google</button>
        </div>
    );
};

export default Login;