const { get } = require("../api/actions/actions-model");

const checkActionsId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { method } = req;
    console.log(method);

    switch (method) {
      case "GET": {
        if (!id)
          return res
            .status(404)
            .json({ message: "No ID given in the request parameters." });

        if (!(await get(id))) {
          return res.status(404).json({
            message: "No ID given in the requrest parameters.",
          });
        }
        break;
      }
      case "PUT":
      case "POST":
        {
          const { project_id, description, notes } = req.body;

          if (!project_id || !description || !notes)
            return res.status(400).json({
              message: "All fields are required.",
            });
          req.createdPost = { project_id, description, notes };
        }
        break;

      default:
        break;
    }
  } catch (error) {
    console.error(error);
    return res.status(500);
  }

  next();
};

module.exports = checkActionsId;
