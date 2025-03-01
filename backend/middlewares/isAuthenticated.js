import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies.token; // ✅ Correct way to access cookies
    if (!token) {
      return res.status(401).json({
        message: "You are not authenticated",
        success: false,
      });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY); // ✅ No need for await
    if (!decode) {
      return res.status(401).json({
        message: "Invalid Token",
        success: false,
      });
    }

    req.id = decode.userId; // ✅ Assign userId to request object
    next(); // ✅ Move to the next middleware
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export default isAuthenticated;
