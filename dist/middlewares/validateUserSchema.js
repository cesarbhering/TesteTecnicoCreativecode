"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
function validateUserSchema(req, res, next) {
    const schema = joi_1.default.object().keys({
        name: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
        });
    }
    next();
}
exports.validateUserSchema = validateUserSchema;
;
