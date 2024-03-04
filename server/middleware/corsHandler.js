// import ErrorResponse from "../utils/errorResponse.js";

// Middleware for handling CORS

const corsHandler = (req, res, next) => {
  // List of origins allowed to access the server (CORS Whitelist)
  const allowedOrigins = [
    "http://localhost:3000",
    "http://147.182.235.79:5000",
    "https://localhost:3000",
    "https://localhost:5000",
    "http://localhost:8081",
    "http://localhost:5173",
  ];

  // Origin of the incoming request

  const origin = req.get("origin");

  // Check if the origin is in the whitelist

  const isWhiteListed = allowedOrigins.includes(origin);

  // Set Cors Headers based on weather the origin is whitelisted
  if (isWhiteListed) {
    req.originSource = "Whitelisted Origin";
    res.setHeader("Access-Control-Allow-Origin", req.get("origin"));
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With, Content-Type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
  } else {
    // Example: Resond with an error message or allow CORS for specific purposes.
    // res.status(403).json({message: "Origin not allowed"})

    // Later on when deploying to production we need to restrict the origin to only the domain of the website that will be using the API and remove the following line of code

    req.originSource = "Non-Whitelisted Origin";
    res.setHeader("Access-Control-Allow-Origin", req.get("origin"));
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With, Content-Type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
  }

  // Check if the request method is OPTIONS

  if (req.method === "OPTIONS") {
    res.status(200).json({});
  } else {
    next();
  }
};

export default corsHandler;
