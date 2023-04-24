import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { apiUrl } from "../../constant";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import homeIcon from "../../images/icons/ic-house.svg";
const Login = () => {
    const auth = getAuth();
    const handleLoginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();

        const {
            user: { uid, displayName, email },
        } = await signInWithPopup(auth, provider);
        try {
            // await axios.post(`${apiUrl}/auth/hoho`, {
            //     abc: "xyz",
            //     hehe: "haha",
            // });
            // console.log("GET TOKEN: ", localStorage.getItem("accessToken"));
            const data = await axios.post(`${apiUrl}/auth/login`, {
                uid,
                name: displayName,
                email
            });
            console.log("register", { data });
        } catch (err) {
            console.log("ERROR: ", err);
        }
    };

    if (localStorage.getItem("accessToken")) {
        return <Navigate to="/" />;
    }
    return (
        <>
            {/* <div>Authss</div>
            <button onClick={handleLoginWithGoogle}>Login</button> */}
            <div className="w-full h-screen bg-gradient-to-b from-[#BBF6FE] to-[#D0CDF2] flex items-center justify-center
             rounded-md">
                <div className="w-[640px] h-[600px] px-4 py-12 rounded-2xl bg-white border border-white">
                    <div className="logo text-center mb-16">
                        {/* <img src={homeIcon} alt="" /> */}
                        <h1 className="text-4xl font-bold">Welcome back</h1>
                    </div>
                    <div className="login-methods flex flex-col items-center">
                        <button onClick={handleLoginWithGoogle} className="login-google px-4 py-4 flex items-center w-80 h-11 border border-slate-400 rounded-full text-center">
                            <img src="https://accounts.fullstack.edu.vn/assets/images/signin/google-18px.svg" alt="" />
                            <h3 className="font-semibold w-full text-center">Login with Google</h3>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
