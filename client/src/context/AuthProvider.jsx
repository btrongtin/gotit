import React, { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import setAuthToken from "../utils/setAuthToken";
import axios from "axios";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const auth = getAuth();

    useEffect(() => {
        const unsubcribed = auth.onIdTokenChanged((loggedInUser) => {
            console.log("[From AuthProvider]", { loggedInUser });
            // console.log('HEADER: ', axios.defaults.headers)
            if (loggedInUser?.uid) {
                setUser(loggedInUser);
                if (
                    loggedInUser.accessToken !==
                    localStorage.getItem("accessToken")
                ) {
                    localStorage.setItem(
                        "accessToken",
                        loggedInUser.accessToken
                    );
                    setAuthToken(localStorage["accessToken"]);
                    // loadUser();
                    window.location.reload();
                }
                else setAuthToken(localStorage["accessToken"]);
                setIsLoading(false);

                return;
            }

            // reset user info
            console.log("reset");
            setIsLoading(false);
            setUser({});
            localStorage.clear();
            navigate("/login");
        });

        return () => {
            unsubcribed();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth]);
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {isLoading ? <div>loading</div> : children}
        </AuthContext.Provider>
    );
}
