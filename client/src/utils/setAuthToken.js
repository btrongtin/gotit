import axios from "axios";

const setAuthToken = (token) => {
    console.log("SET AUTHTOKEN: ", token);
    if (token) {
        console.log("HAS TOKEN");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    //  else {
    //     console.log("MISSING TOKEN");
    //     delete axios.defaults.headers.common["Authorization"];
    // }
};

export default setAuthToken;
