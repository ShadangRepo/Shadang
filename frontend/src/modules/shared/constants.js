const Config = {
    BASE_URL: process.env.NODE_ENV === "development" ? "https://us-central1-shadang-63a81.cloudfunctions.net/app" : "https://shadang.in"
}

export { Config }