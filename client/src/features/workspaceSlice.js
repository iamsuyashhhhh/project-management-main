import { createSlice } from "@reduxjs/toolkit";
import { dummyWorkspaces } from "../assets/assets";

// ✅ Safer initial state (prevents currentWorkspace undefined crash)
const initialState = {
  workspaces: dummyWorkspaces || [],
  currentWorkspace:
    dummyWorkspaces && Array.isArray(dummyWorkspaces) && dummyWorkspaces.length > 0
      ? dummyWorkspaces[0]
      : null,
  loading: false,
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setWorkspaces: (state, action) => {
      state.workspaces = action.payload || [];
      if (!state.currentWorkspace && state.workspaces.length > 0) {
        state.currentWorkspace = state.workspaces[0];
      }
    },

    setCurrentWorkspace: (state, action) => {
      const id = action.payload;
      localStorage.setItem("currentWorkspaceId", id);

      const found = state.workspaces.find((w) => w.id === id);
      state.currentWorkspace = found || state.workspaces[0] || null;
    },

    addWorkspace: (state, action) => {
      state.workspaces.push(action.payload);

      // set current workspace to the new workspace
      if (state.currentWorkspace?.id !== action.payload.id) {
        state.currentWorkspace = action.payload;
      }
    },

    updateWorkspace: (state, action) => {
      state.workspaces = state.workspaces.map((w) =>
        w.id === action.payload.id ? action.payload : w
      );

      // if current workspace is updated, set it to the updated workspace
      if (state.currentWorkspace?.id === action.payload.id) {
        state.currentWorkspace = action.payload;
      }
    },

    deleteWorkspace: (state, action) => {
      state.workspaces = state.workspaces.filter((w) => w._id !== action.payload);

      // keep currentWorkspace valid
      if (state.currentWorkspace && !state.workspaces.some((w) => w.id === state.currentWorkspace.id)) {
        state.currentWorkspace = state.workspaces[0] || null;
      }
    },

    // ✅ ADD PROJECT
    addProject: (state, action) => {
      if (!state.currentWorkspace) return;

      if (!state.currentWorkspace.projects) state.currentWorkspace.projects = [];
      state.currentWorkspace.projects.push(action.payload);

      // find workspace by id and add project to it
      state.workspaces = state.workspaces.map((w) =>
        w.id === state.currentWorkspace.id
          ? { ...w, projects: (w.projects || []).concat(action.payload) }
          : w
      );
    },

    // ✅ UPDATE PROJECT (Settings Save)
    updateProject: (state, action) => {
      const updated = action.payload;
      if (!state.currentWorkspace) return;

      // update in current workspace
      state.currentWorkspace.projects = (state.currentWorkspace.projects || []).map((p) =>
        p.id === updated.id ? { ...p, ...updated } : p
      );

      // update in workspaces list
      state.workspaces = state.workspaces.map((w) =>
        w.id === state.currentWorkspace.id
          ? {
              ...w,
              projects: (w.projects || []).map((p) =>
                p.id === updated.id ? { ...p, ...updated } : p
              ),
            }
          : w
      );
    },

    // ✅ ADD PROJECT MEMBER
    addProjectMember: (state, action) => {
      const { projectId, member } = action.payload;
      if (!state.currentWorkspace) return;

      // update in current workspace
      state.currentWorkspace.projects = (state.currentWorkspace.projects || []).map((p) => {
        if (p.id !== projectId) return p;

        const members = p.members || [];
        const exists = members.some((m) => m.userId === member.userId);
        if (exists) return p;

        return { ...p, members: [...members, member] };
      });

      // update in workspaces list
      state.workspaces = state.workspaces.map((w) =>
        w.id === state.currentWorkspace.id
          ? {
              ...w,
              projects: (w.projects || []).map((p) => {
                if (p.id !== projectId) return p;

                const members = p.members || [];
                const exists = members.some((m) => m.userId === member.userId);
                if (exists) return p;

                return { ...p, members: [...members, member] };
              }),
            }
          : w
      );
    },

    // ✅ ADD TASK
    addTask: (state, action) => {
      if (!state.currentWorkspace) return;

      // ensure projects exist
      if (!state.currentWorkspace.projects) state.currentWorkspace.projects = [];

      state.currentWorkspace.projects = state.currentWorkspace.projects.map((p) => {
        if (p.id === action.payload.projectId) {
          if (!p.tasks) p.tasks = [];
          p.tasks.push(action.payload);
        }
        return p;
      });

      // find workspace and project by id and add task to it
      state.workspaces = state.workspaces.map((w) =>
        w.id === state.currentWorkspace.id
          ? {
              ...w,
              projects: (w.projects || []).map((p) =>
                p.id === action.payload.projectId
                  ? { ...p, tasks: (p.tasks || []).concat(action.payload) }
                  : p
              ),
            }
          : w
      );
    },

    updateTask: (state, action) => {
      if (!state.currentWorkspace) return;

      state.currentWorkspace.projects = (state.currentWorkspace.projects || []).map((p) => {
        if (p.id === action.payload.projectId) {
          p.tasks = (p.tasks || []).map((t) => (t.id === action.payload.id ? action.payload : t));
        }
        return p;
      });

      // find workspace and project by id and update task in it
      state.workspaces = state.workspaces.map((w) =>
        w.id === state.currentWorkspace.id
          ? {
              ...w,
              projects: (w.projects || []).map((p) =>
                p.id === action.payload.projectId
                  ? {
                      ...p,
                      tasks: (p.tasks || []).map((t) =>
                        t.id === action.payload.id ? action.payload : t
                      ),
                    }
                  : p
              ),
            }
          : w
      );
    },

    deleteTask: (state, action) => {
      if (!state.currentWorkspace) return;

      // NOTE: Your existing code expects action.payload to be a list of task IDs
      const idsToDelete = Array.isArray(action.payload) ? action.payload : [];

      state.currentWorkspace.projects = (state.currentWorkspace.projects || []).map((p) => {
        p.tasks = (p.tasks || []).filter((t) => !idsToDelete.includes(t.id));
        return p;
      });

      state.workspaces = state.workspaces.map((w) =>
        w.id === state.currentWorkspace.id
          ? {
              ...w,
              projects: (w.projects || []).map((p) => ({
                ...p,
                tasks: (p.tasks || []).filter((t) => !idsToDelete.includes(t.id)),
              })),
            }
          : w
      );
    },
  },
});

export const {
  setWorkspaces,
  setCurrentWorkspace,
  addWorkspace,
  updateWorkspace,
  deleteWorkspace,
  addProject,
  updateProject,
  addTask,
  updateTask,
  deleteTask,
  addProjectMember,
} = workspaceSlice.actions;

export default workspaceSlice.reducer;
