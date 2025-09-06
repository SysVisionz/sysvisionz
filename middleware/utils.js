import User from "../models/User";
export const authenticate = (req, level = 'admin') => {
    const code = req.headers["x-auth"];
    return User.findByToken(code);
};
export const Err = (err, res) => {
    res.status(err?.status ?? 500).send(err?.message ?? err);
};
