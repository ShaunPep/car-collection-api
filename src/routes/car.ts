import { Router, Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";

import { getDb } from "../db";
import validateCar from "../validation/carValidation";

const car = Router();

car.get("/", (req: Request, res: Response) => {
  const db = getDb();
  db.collection("cars")
    .find()
    .sort({ make: 1 })
    .toArray()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Could not fetch your documents" });
    });
});

car.post("/", validateCar, (req: Request, res: Response) => {
  const newCar = req.body;

  const db = getDb();
  db.collection("cars")
    .insertOne(newCar)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not create new document" });
    });
});

car.delete("/:id", (req: Request, res: Response) => {
  if (ObjectId.isValid(req.params.id)) {
    const db = getDb();
    db.collection("cars")
      .deleteOne({ _id: new ObjectId(req.params.id) })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json({ error: "Could not delete document" });
      });
  } else {
    res.status(500).json({ error: "Not a valid document id" });
  }
});

car.patch("/:id", (req: Request, res: Response) => {
  const updates = req.body;
  delete updates["_id"];

  if (ObjectId.isValid(req.params.id)) {
    const db = getDb();
    db.collection("cars")
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json({ error: "Could not update document" });
      });
  } else {
    res.status(500).json({ error: "Not a valid document id" });
  }
});

export default car;
