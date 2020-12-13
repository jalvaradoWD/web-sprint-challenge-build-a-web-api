// Write your "actions" router here!
const router = require("express").Router();
const { get, insert, update, remove } = require("./actions-model");

// TODO: Add middleware to the action routes

/**
 * @method GET
 * @route /api/actions
 * @description
 * Sends an array of actions (or an empty array) as the body of the response.
 */
router.get("/", async (req, res) => {
  res.status(200).json(await get());
});

/**
 * @method GET
 * @route /api/actions/:id
 * @description
 * Sends an action with the given id as the body of the response.
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  return res.status(200).json(await get(id));
});

/**
 * @method POST
 * @route /api/actions/
 * @description
 * Sends the newly created action as the body of the response.
 */
router.post("/", async (req, res) => {
  /**
   * Request Body Required Fields
   * =============
   * project_id
   * description
   * notes
   */

  return res.status(201).json(await insert(req.body));
});

/**
 * @method PUT
 * @route /api/actions/:id
 * @description
 * Sends the updated action as the body of the response.
 */
router.put("/:id", async (req, res) => {
  /**
   * Request Body Required Fields
   * =============
   * description
   * notes
   * completed
   */
  const { id } = req.params;

  return res.status(202).json(await update(id, req.body));
});

/**
 * @method DELETE
 * @route /api/actions/:id
 * @description
 * sends no response body
 */
router.delete("/:id", async (req, res) => {
  await remove(req.params.id);
  res.status(202).json({ messge: "Action deleted" });
});

module.exports = router;
