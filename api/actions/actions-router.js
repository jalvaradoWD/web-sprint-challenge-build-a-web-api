// Write your "actions" router here!
const router = require("express").Router();
const { get } = require("./actions-model");

/**
 * @method GET
 * @route /api/actions
 * @description Sends an array of actions (or an empty array) as the body of the response.
 */
router.get("/", async (req, res) => {
  res.status(200).json(await get());
});

/**
 * @method GET
 * @route /api/actions/:id
 * @description  Sends an action with the given id as the body of the response.
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  return res.status(200).json(await get(id));
});

// router.post("/", async (req, res) => {});
// router.put("/", async (req, res) => {});
// router.delete("/", async (req, res) => {});

module.exports = router;
