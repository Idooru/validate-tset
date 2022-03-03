import express from "express";
import { body, param } from "express-validator";
import validate from "../middlewares/validator.js";

const router = express.Router();

const validationBody = [
    body("email").trim().isEmail().withMessage("이메일 형식을 입력해주세요."),
    body("username")
        .trim()
        .isLength({ min: 3, max: 15 })
        .withMessage("길이를 준수해주세요."),
    body("password")
        .trim()
        .isLength({ min: 5 })
        .withMessage("길이를 준수해주세요."),
    validate,
];

const validationParam = [
    param("id").isInt().withMessage("숫자만 입력해주세요"),
    validate,
];

router.get("/:id", validationParam, (req, res, next) => {
    let id = req.params.id;
    if (id === "1") {
        id = "root";
        console.log(id);
        return res.send(
            `환영합니다. ${id}님, 당신은 루트 권한을 획득했습니다.`
        );
    }
    console.log(id);
    return res.send(`환영합니다. ${id}님`);
});

router.post("/send", validationBody, (req, res, next) => {
    const { email } = req.body;
    const { username } = req.body;
    const { password } = req.body;

    const user = {
        id: Date.now().toString(),
        email,
        username,
        password,
        createdAt: new Date(),
    };

    res.status(201).json(user);
});

export default router;
