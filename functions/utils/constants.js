const TableName = {
    users: "users",
    exhibitions: "exhibitions",
    exhibitionFiles: "exhibitionFiles"
};
const TOKEN_KEY = "egrRv6dd643DgeDF6fsGhtER6s0Gy";
const REFRESH_TOKEN_KEY = "e4FkfLkciE72EDSodvWb2Fidaio5F";

const TokenExpiredMessage = "Token expired";
const RefreshTokenExpiredMessage = "Refresh token expired";
const DocumentNotExistMessage = "Document Not Exist";
const NoTokenPresent = "A token is required for authentication";

module.exports = {
    TableName,
    TOKEN_KEY,
    REFRESH_TOKEN_KEY,
    TokenExpiredMessage,
    RefreshTokenExpiredMessage,
    DocumentNotExistMessage,
    NoTokenPresent
}