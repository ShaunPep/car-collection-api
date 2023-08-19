import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const schema = Joi.object({
  make: Joi.string().required(),
  model: Joi.string().required(),
  topSpeed: Joi.number().min(100).required(),
  color: Joi.string(),
});

const validateCar = (req: Request, res: Response, next: NextFunction) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    res.status(500).json({ error: validationResult.error.message });
  } else {
    next();
  }
};

export default validateCar;
