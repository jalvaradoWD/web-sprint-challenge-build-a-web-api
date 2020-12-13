const { get } = require("../api/projects/projects-model");

const checkProjectMiddleware = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { method } = req;

    switch (method) {
      case "DELETE":
      case "GET": {
        const foundProject = await get(id);

        if (!foundProject)
          return res
            .status(404)
            .json({ message: "Project does not exist with that id." });

        break;
      }

      case "PUT":
      case "POST": {
        const { name, description, completed } = req.body;

        if (
          !name ||
          !description ||
          !(completed === false || completed === true)
        ) {
          return res.status(400).json({
            message: "One or more of the required fields are not filled out.",
          });
        }

        req.createdProject = {
          name,
          description,
          completed,
        };
        break;
      }

      default:
        break;
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errorMessage: "Server error" });
  }
  next();
};

module.exports = checkProjectMiddleware;
