import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { apiUrl } from "../../constant";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

const Login = () => {
    const auth = getAuth();
    const handleLoginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();

        const {
            user: { uid, displayName },
        } = await signInWithPopup(auth, provider);
        try {
            // await axios.post(`${apiUrl}/auth/hoho`, {
            //     abc: "xyz",
            //     hehe: "haha",
            // });
            console.log("GET TOKEN: ", localStorage.getItem("accessToken"));
            const data = await axios.post(`${apiUrl}/auth/login`, {
                uid,
                name: displayName,
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
            </div>
        </>
    );
};

export default Login;
