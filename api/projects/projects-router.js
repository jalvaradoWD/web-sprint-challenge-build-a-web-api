// Write your "projects" router here!
const router = require("express").Router();

// TODO: Add middleware to the projects routes

const {
  get,
  getProjectActions,
  insert,
  update,
  remove,
} = require("./projects-model");

/**
 * @method GET
 * @route /api/projects
 * @description
 * Sends an array of projects (or an empty array) as the body of the response.
 */
router.get("/", async (req, res) => {
  return res.status(200).json(await get());
});

/**
 * @method GET
 * @route /api/projects/:id
 * @description
 * Sends a project with the given id as the body of the response.
 */
router.get("/:id", async (req, res) => {
  return res.status(200).json(await get(req.params.id));
});

/**
 * @method POST
 * @route /api/projects
 * @description
 * Sends the newly created project as the body of the response.
 */
router.post("/", async (req, res) => {
  /**
   * Expected Fields to be given.
   * name
   * description
   * completed
   */
  const createdPost = {
    ...req.body,
  };
  await insert(req.body);
  return res.status(201).json(createdPost);
});

/**
 * @method PUT
 * @route /api/projects/:id
 * @description
 * Sends the updated project as the body of the response.
 */
router.put("/:id", async (req, res) => {
  /**
   * Expected Fields to be given.
   * name
   * description
   * completed
   */
  await update(req.params.id, req.body);
  return res.status(200).json(req.body);
});

/**
 * @method DELETE
 * @route /api/projects/:id
 * @description
 * Sends no response body.
 */
router.delete("/:id", async (req, res) => {
  await remove(req.params.id);
  return res.json({ message: "Project deleted" });
});

/**
 * @method DELETE
 * @route /api/projects/:id
 * @description
 * Sends no response body.
 */

router.get("/:id/actions", async (req, res) => {
  return res.status(200).json(await getProjectActions(req.params.id));
});

module.exports = router;
