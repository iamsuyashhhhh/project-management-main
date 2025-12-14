const Project = require("../models/Project");

exports.createProject = async (req, res) => {
  try {
    const {
      name,
      description,
      status,
      priority,
      start_date,
      end_date,
      team_members,
      team_lead,
      progress,
    } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Project name is required" });
    }

    const project = await Project.create({
      name,
      description,
      status,
      priority,
      start_date,
      end_date,
      team_members,
      team_lead,
      progress,
      owner: req.user.id, // comes from auth middleware
    });

    return res.status(201).json({ success: true, project });
  } catch (err) {
    console.error("CREATE PROJECT ERROR:", err);
    return res
      .status(500)
      .json({ message: "Server error while creating project" });
  }
};
