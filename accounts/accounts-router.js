const express = require("express");
const db = require("../data/dbConfig");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const accounts = await db.select("*").from("accounts");
    res.status(200).json(accounts);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const [account] = await db
      .select("*")
      .from("accounts")
      .where({ id })
      .limit(1);
    res.status(200).json(account);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const accountData = req.body;
    await db("accounts")
      .insert(accountData)
      .then((id) => {
        res.status(201).json({ data: id[0] });
      });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const change = req.body;
  try {
    await db("accounts")
      .where({ id })
      .update(change)
      .then((count) => {
        if (count > 0) {
          res.status(200).json({ change });
        } else {
          res.status(404).json({ message: "No account with that ID" });
        }
      });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
    const {id} = req.params;
    try{
        await db("accounts")
        .where("id", id)
        .del()
        .then(count => {
            if(count > 0) {
                res.status(200).json({id})
            } else {
                res.status(404).json('Could not delete post')
            }
        })
    } catch (err) {
        next(err);
      }
})

module.exports = router;
