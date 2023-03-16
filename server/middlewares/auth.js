import { getAuth } from "firebase-admin/auth";

const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    console.log("AAA authHeader: ", authHeader);
    const token = authHeader && authHeader.split(" ")[1];

    if (!token)
        return res
            .status(400)
            .json({ success: false, message: "Access token not found hehe" });

    // try {
    //     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    //     req.userId = decoded.userId;
    //     next();
    // } catch (error) {
    //     console.log(error);
    //     return res
    //         .status(403)
    //         .json({ success: false, message: "Invalid token" });
    // }

    getAuth()
        .verifyIdToken(token)
        .then((decodedToken) => {
            console.log({ decodedToken });
            // res.locals.uid = decodedToken.uid;
            req.uid = decodedToken.uid;
            next();
        })
        .catch((err) => {
            console.log({ err });
            return res
                .status(403)
                .json({ success: false, message: "forbidden", error: err });
        });
};

export default verifyToken;
