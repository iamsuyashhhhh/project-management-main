import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";
import CreateProjectDialog from "../components/CreateProjectDialog";
import ProjectCard from "../components/ProjectCard";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchProjects = async () => {
    try {
      const res = await axiosInstance.get("/projects");
      setProjects(res.data); // backend should return an array of projects
    } catch (err) {
      console.error("FETCH PROJECTS ERROR:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleProjectCreated = () => {
    // refetch list after creating a project
    fetchProjects();
  };

  return (
    <div className="px-6 py-4">
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold">Projects</h1>
          <p className="text-sm text-zinc-500">
            Manage and track your projects
          </p>
        </div>

        <button
          onClick={() => setIsDialogOpen(true)}
          className="px-4 py-2 rounded bg-gradient-to-br from-blue-500 to-blue-600 text-white text-sm font-medium"
        >
          + New Project
        </button>
      </div>

      {/* Projects grid */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project._id || project.name}
            project={project}
          />
        ))}
      </div>

      {/* Create project dialog */}
      <CreateProjectDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        onProjectCreated={handleProjectCreated}
      />
    </div>
  );
};

export default Projects;
