import React, { useEffect, useState } from "react";
import "./ProjectPage.css";
const API_URL =
  "https://a9vqiga5na.execute-api.ap-south-1.amazonaws.com/prod/project";

/* ===========================
   COMPANY DATA
=========================== */

const companies = [
  {
    id: 1,
    name: "KADEN KOPPERS GROUP",
    categories: [
      "RESORTS",
      "BANQUETS",
      "HOTELS",
      "VILLAS",
      "STUDIOS",
      "FARMHOUSES",
      "COTTAGES",
    ],
  },
  {
    id: 2,
    name: "THE ROYAL CRAFT",
    categories: [
      "EXTERIOR",
      "FIBER MANDAP",
      "FIBER GATE",
      "FIBER WORK",
      "FIBER STAGE",
      "FOUNTAIN",
      "GAZEBO",
      "INTERIOR",
      "URLI",
      "STATUE",
    ],
  },
  {
    id: 3,
    name: "VINSJOY",
    categories: [
      "FURNITURE",
      "LIGHTS",
      "CARPETS",
      "ARTIFICIAL GLASS & WATER",
      "FABRIC DECOR",
      "FIBER DECOR",
      "CATERING",
      "FOOD COUNTER",
      "SELFIE POINT",
      "DJ & SOUND",
    ],
  },
  {
    id: 4,
    name: "KADEN KOPPER FOUNDATION",
    categories: [
      "OFFICES",
      "LABS",
      "IT PARK",
    ],
  },
  {
    id: 5,
    name: "KADEN KOPPERS HOSPITALITY",
    categories: [
      "EVENTS",
      "SHOWS",
      "CORPORATE",
    ],
  },
  {
    id: 6,
    name: "EVENT PLAYER",
    categories: [
      "CORPORATE",
      "OFFICES",
      "INTERIOR",
    ],
  },
  {
    id: 7,
    name: "GO GREEN LIFE",
    categories: [
      "VILLAS",
      "PENTHOUSES",
      "APARTMENTS",
    ],
  },
  {
    id: 8,
    name: "THE WEDDING MITRA",
    categories: [
      "COMMERCIAL",
      "RESIDENTIAL",
      "MALLS",
    ],
  },
  {
    id: 9,
    name: "ZENERGY",
    categories: [
      "FARMS",
      "GREEN BUILDINGS",
      "LANDSCAPES",
    ],
  },
];

const ProjectPage = () => {

  /* ==========================================
      STATES
  ========================================== */

  const [showModal, setShowModal] = useState(false);

  const [projects, setProjects] = useState([]);

  const [editingProject, setEditingProject] =
    useState(null);

  const [oldImageKey, setOldImageKey] =
    useState("");

  const [selectedCompany, setSelectedCompany] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("");

  const [projectName, setProjectName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [image, setImage] =
    useState(null);

  const currentCompany =
    companies.find(
      (item) =>
        item.name === selectedCompany
    );

  /* ==========================================
      LOAD PROJECTS
  ========================================== */

  const loadProjects = async () => {

    try {

      const response =
        await fetch(API_URL);

      if (!response.ok) {

        throw new Error(
          "Unable to load projects"
        );

      }

      const data =
        await response.json();

      setProjects(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (err) {

      console.error(err);

      setProjects([]);

    }

  };

  useEffect(() => {

    loadProjects();

  }, []);

  /* ==========================================
      RESET FORM
  ========================================== */

  const resetForm = () => {

    setEditingProject(null);

    setOldImageKey("");

    setSelectedCompany("");

    setSelectedCategory("");

    setProjectName("");

    setDescription("");

    setImage(null);

  };

  /* ==========================================
      ADD PROJECT
  ========================================== */

  const handleAddProject = () => {

    resetForm();

    setShowModal(true);

  };

  /* ==========================================
      EDIT PROJECT
  ========================================== */

  const handleEditProject = (project) => {

    setEditingProject(project);

    setOldImageKey(
      project.key || ""
    );

    setSelectedCompany(
      project.company || ""
    );

    setSelectedCategory(
      project.category || ""
    );

    setProjectName(
      project.projectName || ""
    );

    setDescription(
      project.description || ""
    );

    setImage(
      project.image || null
    );

    setShowModal(true);

  };

  /* ==========================================
      UPLOAD IMAGE
  ========================================== */

  const uploadImage = async (file) => {

    const response =
      await fetch(

        `${API_URL}?upload=true&fileName=${encodeURIComponent(
          file.name
        )}&fileType=${encodeURIComponent(
          file.type
        )}`

      );

    if (!response.ok) {

      throw new Error(
        "Unable to create upload URL"
      );

    }

    const uploadData =
      await response.json();

    const upload =
      await fetch(
        uploadData.uploadUrl,
        {

          method: "PUT",

          headers: {
            "Content-Type":
              file.type,
          },

          body: file,

        }
      );

    if (!upload.ok) {

      throw new Error(
        "Image Upload Failed"
      );

    }

    return {

      image:
        uploadData.fileUrl,

      key:
        uploadData.key,

    };

  };
    /* ==========================================
      SAVE PROJECT (ADD + EDIT)
  ========================================== */

  const handleSave = async () => {

    try {

      if (
        !selectedCompany ||
        !selectedCategory ||
        !projectName.trim() ||
        !description.trim()
      ) {

        alert("Please fill all fields.");

        return;

      }

      let projectImage = {

        image: image,

        key: oldImageKey,

      };

      /* ===============================
          Upload New Image
      ============================== */

      if (
        image &&
        typeof image !== "string"
      ) {

        projectImage =
          await uploadImage(image);

      }

      /* ===============================
          UPDATE PROJECT
      ============================== */

      if (editingProject) {

        const response =
          await fetch(API_URL, {

            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({

              id:
                editingProject.id,

              company:
                selectedCompany,

              category:
                selectedCategory,

              projectName,

              description,

              image:
                projectImage.image,

              key:
                projectImage.key,

              oldKey:
                oldImageKey,

            }),

          });

        if (!response.ok) {

          throw new Error(
            "Update Failed"
          );

        }

        alert(
          "Project Updated Successfully"
        );

      }

      /* ===============================
          ADD PROJECT
      ============================== */

      else {

        const response =
          await fetch(API_URL, {

            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({

              id: Date.now(),

              company:
                selectedCompany,

              category:
                selectedCategory,

              projectName,

              description,

              image:
                projectImage.image,

              key:
                projectImage.key,

              created:
                new Date().toLocaleDateString(),

            }),

          });

        if (!response.ok) {

          throw new Error(
            "Save Failed"
          );

        }

        alert(
          "Project Added Successfully"
        );

      }

      await loadProjects();

      resetForm();

      setShowModal(false);

    } catch (err) {

      console.error(err);

      alert(err.message);

    }

  };
    /* ==========================================
      DELETE PROJECT
  ========================================== */

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this project?")) {
      return;
    }

    try {

      const response = await fetch(API_URL, {

        method: "DELETE",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          id,
        }),

      });

      if (!response.ok) {
        throw new Error("Delete Failed");
      }

      await loadProjects();

      alert("Project Deleted Successfully");

    } catch (err) {

      console.error(err);

      alert(err.message);

    }

  };

  /* ==========================================
      JSX
  ========================================== */

  return (

    <div className="project-page">

      {/* ================= HEADER ================= */}

      <div className="page-header">

        <h2>Project Management</h2>

        <button
          className="add-btn"
          onClick={handleAddProject}
        >
          + Add Images
        </button>

      </div>

      {/* ================= MODAL ================= */}

      {showModal && (

        <div className="modal-overlay">

          <div className="project-modal">

            <div className="modal-header">

              <h3>

                {editingProject
                  ? "Edit Project"
                  : "Add Project"}

              </h3>

              <button
                onClick={() => {

                  resetForm();

                  setShowModal(false);

                }}
              >
                ✕

              </button>

            </div>

            {/* ================= COMPANY ================= */}

            <div className="form-group">

              <label>Company</label>

              <select

                value={selectedCompany}

                onChange={(e) => {

                  setSelectedCompany(
                    e.target.value
                  );

                  setSelectedCategory("");

                }}

              >

                <option value="">
                  Select Company
                </option>

                {companies.map((company) => (

                  <option

                    key={company.id}

                    value={company.name}

                  >

                    {company.name}

                  </option>

                ))}

              </select>

            </div>

            {/* ================= CATEGORY ================= */}

            {selectedCompany && (

              <div className="form-group">

                <label>Category</label>

                <select

                  value={selectedCategory}

                  onChange={(e) =>
                    setSelectedCategory(
                      e.target.value
                    )
                  }

                >

                  <option value="">
                    Select Category
                  </option>

                  {currentCompany.categories.map((cat) => (

                    <option

                      key={cat}

                      value={cat}

                    >

                      {cat}

                    </option>

                  ))}

                </select>

              </div>

            )}

            {/* ================= PROJECT DETAILS ================= */}

            {selectedCategory && (

              <>
                              {/* ================= PROJECT IMAGE ================= */}

                <div className="form-group">

                  <label>Project Image</label>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {

                      if (e.target.files[0]) {

                        setImage(e.target.files[0]);

                      }

                    }}
                  />

                  {image && (

                    <img
                      src={
                        typeof image === "string"
                          ? image
                          : URL.createObjectURL(image)
                      }
                      alt="Preview"
                      className="image-preview"
                    />

                  )}

                </div>

                {/* ================= PROJECT NAME ================= */}

                <div className="form-group">

                  <label>Project Name</label>

                  <input
                    type="text"
                    placeholder="Enter Project Name"
                    value={projectName}
                    onChange={(e) =>
                      setProjectName(e.target.value)
                    }
                  />

                </div>

                {/* ================= DESCRIPTION ================= */}

                <div className="form-group">

                  <label>Description</label>

                  <textarea
                    rows="5"
                    placeholder="Enter Description"
                    value={description}
                    onChange={(e) =>
                      setDescription(e.target.value)
                    }
                  />

                </div>

                {/* ================= SAVE / UPDATE ================= */}

                <div className="modal-footer">

                  <button
                    className="save-btn"
                    onClick={handleSave}
                  >

                    {editingProject
                      ? "Update Project"
                      : "Save Project"}

                  </button>

                </div>

              </>
                          )}

          </div>

        </div>

      )}

      {/* ===========================================
          PROJECT LIST
      =========================================== */}

      <div className="project-list">

        {projects.length === 0 ? (

          <div className="empty-state">

            <h3>No Projects Added</h3>

            <p>
              Click <b>+ Add Images</b> to create your first project.
            </p>

          </div>

        ) : (

          <div className="table-wrapper">

            <table className="project-table">

              <thead>

                <tr>

                  <th>No</th>

                  <th>Preview</th>

                  <th>Company</th>

                  <th>Category</th>

                  <th>Project Name</th>

                  <th>Description</th>

                  <th>Status</th>

                  <th>Action</th>

                </tr>

              </thead>

              <tbody>

                {projects.map((project, index) => (

                  <tr key={project.id}>

                    <td>{index + 1}</td>

                    <td>

                      <img
                        src={project.image}
                        alt={project.projectName}
                        className="table-image"
                      />

                    </td>

                    <td>{project.company}</td>

                    <td>{project.category}</td>

                    <td>{project.projectName}</td>

                    <td className="desc-cell">

                      {project.description}

                    </td>

                    <td>

                      <span className="status-badge">

                        Show

                      </span>

                    </td>

                    <td>

                      <button
  className="edit-btn"
  onClick={() => handleEditProject(project)}
>
  Edit
</button>

                      <button
                        className="delete-btn"
                        onClick={async () => {

                          if (
                            !window.confirm(
                              "Delete this project?"
                            )
                          )
                            return;

                          await fetch(API_URL, {

                            method: "DELETE",

                            headers: {
                              "Content-Type":
                                "application/json",
                            },

                            body: JSON.stringify({
                              id: project.id,
                            }),

                          });

                          await loadProjects();

                        }}
                      >

                        Delete

                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
      );

};

export default ProjectPage;