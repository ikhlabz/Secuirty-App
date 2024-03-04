import jwt from "jsonwebtoken";

const generateToken = (userInfo) => {
  const accessTokenExpiration = process.env.ACCESS_TOKEN_EXPIRATION || "15m";
  const refreshTokenExpiration = process.env.REFRESH_TOKEN_EXPIRATION || "30d";

  const accessToken = jwt.sign(
    {
      UserInfo: {
        user: userInfo.email,
        userId: userInfo._id,
        roles: userInfo.userRole,
      },
    },
    process.env.SECRET_KEY,
    {
      expiresIn: accessTokenExpiration,
    }
  );

  // Generate refresh token

  const refreshToken = jwt.sign(
    {
      UserInfo: {
        user: userInfo.email,
        userId: userInfo._id,
        roles: userInfo.userRole,
      },
    },
    process.env.SECRET_KEY,
    {
      expiresIn: refreshTokenExpiration,
    }
  );

  return { accessToken, refreshToken };
};

const generateAccessTokenFromRefreshToken = (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, secretKey);
    const userInfo = decoded.UserInfo;

    const accessToken = jwt.sign(
      {
        UserInfo: {
          user: userInfo.email,
          userId: userInfo._id,
          roles: userInfo.userRole,
        },
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "15m",
      }
    );

    return accessToken;
  } catch (error) {
    return null;
  }
};

export { generateToken, generateAccessTokenFromRefreshToken };
