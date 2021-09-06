const Config = {
    // BASE_URL: "https://us-central1-shadang-63a81.cloudfunctions.net/app"
    BASE_URL: process.env.NODE_ENV === "development" ? "http://localhost:5001/shadang-63a81/us-central1/app" : "https://us-central1-shadang-63a81.cloudfunctions.net/app"
}

const BrandName = "Shadang";

export { Config, BrandName }