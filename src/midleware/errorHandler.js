import { HttpError } from "http-errors";

export const errorHandler = (err, req, res, _next) => {
    if (err instanceof HttpError) {
        res.status(err.status).json({ message: err.message })
    }
    console.error(err.stack);

    const isProd = process.env.NODE_ENV === "prodaction"

    res.status(500).json({ message: isProd ? "Internal server error" : err.message });
}