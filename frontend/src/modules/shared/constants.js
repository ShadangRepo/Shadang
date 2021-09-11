const Config = {
    // BASE_URL: "https://us-central1-shadang-63a81.cloudfunctions.net/app"
    BASE_URL: process.env.NODE_ENV === "development" ? "http://localhost:5001/shadang-63a81/us-central1/app" : "https://us-central1-shadang-63a81.cloudfunctions.net/app"
}

const BrandName = "Shadang";

const TokenName = "sec_toc"; //sec_toc stands for secret token
const RefreshTokenName = "sec_ref_toc"; //sec_ref_toc stands for secret refresh token
const TokenExpiredMessage = "Token expired";
const RefreshTokenExpiredMessage = "Refresh token expired";
const NoTokenPresent = "A token is required for authentication";

export { Config, BrandName, TokenName, RefreshTokenName, TokenExpiredMessage, RefreshTokenExpiredMessage, NoTokenPresent };