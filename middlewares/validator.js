import { validationResult } from "express-validator";

const validator = (req, res, next) => {
    const error = validationResult(req);
    if (error.isEmpty()) {
        return next();
    }
    return res.status(400).json({ message: error.array() });
};

export default validator;
