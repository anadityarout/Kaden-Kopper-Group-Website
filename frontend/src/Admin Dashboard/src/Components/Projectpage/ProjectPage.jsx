import React, { useEffect, useState } from "react";
import "./ProjectPage.css";

const API_URL =
  "https://a9vqiga5na.execute-api.ap-south-1.amazonaws.com/prod/project";

/* =========================================================
   COMPANY DATA
========================================================= */

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
    name: "THE ROYAL KRAFT",
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

/* =========================================================
   PROJECT PAGE
========================================================= */

const ProjectPage = () => {
  /* =======================================================
     STATES
  ======================================================= */

  const [showModal, setShowModal] = useState(false);

  const [projects, setProjects] = useState([]);

  const [editingProject, setEditingProject] = useState(null);

  const [oldImageKey, setOldImageKey] = useState("");

  const [selectedCompany, setSelectedCompany] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");

  const [projectName, setProjectName] = useState("");

  const [description, setDescription] = useState("");

  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

  /* =======================================================
     FIND CURRENT COMPANY SAFELY
  ======================================================= */

  const currentCompany = companies.find(
    (item) =>
      item.name.trim().toLowerCase() ===
      selectedCompany.trim().toLowerCase()
  );

  /* =======================================================
     SAFE CATEGORY LIST
  ======================================================= */

  const currentCategories = currentCompany?.categories || [];

  /* =======================================================
     LOAD PROJECTS
  ======================================================= */

  const loadProjects = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Unable to load projects");
      }

      const data = await response.json();

      /*
        API may return:
        - direct array
        - object containing projects
      */

      if (Array.isArray(data)) {
        setProjects(data);
      } else if (Array.isArray(data.projects)) {
        setProjects(data.projects);
      } else {
        setProjects([]);
      }
    } catch (err) {
      console.error("Load Projects Error:", err);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  useEffect(() => {
    loadProjects();
  }, []);

  /* =======================================================
     RESET FORM
  ======================================================= */

  const resetForm = () => {
    setEditingProject(null);

    setOldImageKey("");

    setSelectedCompany("");

    setSelectedCategory("");

    setProjectName("");

    setDescription("");

    setImage(null);
  };

  /* =======================================================
     ADD PROJECT
  ======================================================= */

  const handleAddProject = () => {
    resetForm();

    setShowModal(true);
  };

  /* =======================================================
     EDIT PROJECT
  ======================================================= */

  const handleEditProject = (project) => {
    if (!project) {
      return;
    }

    setEditingProject(project);

    setOldImageKey(project.key || "");

    const companyName = (project.company || "").trim();

    /*
      Check whether company from API exists
      in our company list.
    */

    const matchingCompany = companies.find(
      (company) =>
        company.name.trim().toLowerCase() ===
        companyName.toLowerCase()
    );

    if (matchingCompany) {
      setSelectedCompany(matchingCompany.name);

      /*
        Make sure category belongs to
        the selected company.
      */

      const categoryExists =
        matchingCompany.categories.some(
          (category) =>
            category.trim().toLowerCase() ===
            (project.category || "").trim().toLowerCase()
        );

      if (categoryExists) {
        const actualCategory =
          matchingCompany.categories.find(
            (category) =>
              category.trim().toLowerCase() ===
              (project.category || "").trim().toLowerCase()
          );

        setSelectedCategory(actualCategory);
      } else {
        setSelectedCategory("");
      }
    } else {
      /*
        If API contains an old/invalid company,
        don't allow currentCompany.categories
        to crash the application.
      */

      console.warn(
        "Company not found in company list:",
        companyName
      );

      setSelectedCompany("");
      setSelectedCategory("");
    }

    setProjectName(project.projectName || "");

    setDescription(project.description || "");

    setImage(project.image || null);

    setShowModal(true);
  };

  /* =======================================================
     UPLOAD IMAGE
  ======================================================= */

  const uploadImage = async (file) => {
    if (!file) {
      throw new Error("Please select an image");
    }

    /* -------------------------------------------------------
       STEP 1: GET PRESIGNED URL
    ------------------------------------------------------- */

    const uploadUrl =
      `${API_URL}?upload=true` +
      `&fileName=${encodeURIComponent(file.name)}` +
      `&fileType=${encodeURIComponent(file.type)}`;

    const response = await fetch(uploadUrl);

    if (!response.ok) {
      throw new Error("Unable to create upload URL");
    }

    const uploadData = await response.json();

    if (!uploadData.uploadUrl) {
      throw new Error("Upload URL was not returned by API");
    }

    /* -------------------------------------------------------
       STEP 2: UPLOAD IMAGE TO S3
    ------------------------------------------------------- */

    const uploadResponse = await fetch(
      uploadData.uploadUrl,
      {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      }
    );

    if (!uploadResponse.ok) {
      throw new Error("Image upload failed");
    }

    /* -------------------------------------------------------
       RETURN IMAGE DATA
    ------------------------------------------------------- */

    return {
      image: uploadData.fileUrl,
      key: uploadData.key,
    };
  };

  /* =======================================================
     SAVE PROJECT
     ADD + EDIT
  ======================================================= */

  const handleSave = async () => {
    try {
      /* -----------------------------------------------------
         VALIDATION
      ----------------------------------------------------- */

      if (!selectedCompany) {
        alert("Please select a company.");
        return;
      }

      if (!selectedCategory) {
        alert("Please select a category.");
        return;
      }

      if (!projectName.trim()) {
        alert("Please enter project name.");
        return;
      }

      if (!description.trim()) {
        alert("Please enter description.");
        return;
      }

      /* -----------------------------------------------------
         IMAGE DATA
      ----------------------------------------------------- */

      let projectImage = {
        image: image,
        key: oldImageKey,
      };

      /*
        If image is a File object,
        upload it to S3.
      */

      if (image && typeof image !== "string") {
        projectImage = await uploadImage(image);
      }

      /* -----------------------------------------------------
         UPDATE EXISTING PROJECT
      ----------------------------------------------------- */

      if (editingProject) {
        const response = await fetch(API_URL, {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            id: editingProject.id,

            company: selectedCompany,

            category: selectedCategory,

            projectName: projectName.trim(),

            description: description.trim(),

            image: projectImage.image,

            key: projectImage.key,

            oldKey: oldImageKey,
          }),
        });

        if (!response.ok) {
          throw new Error("Update Failed");
        }

        alert("Project Updated Successfully");
      }

      /* -----------------------------------------------------
         ADD NEW PROJECT
      ----------------------------------------------------- */

      else {
        const response = await fetch(API_URL, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            id: Date.now(),

            company: selectedCompany,

            category: selectedCategory,

            projectName: projectName.trim(),

            description: description.trim(),

            image: projectImage.image,

            key: projectImage.key,

            created: new Date().toLocaleDateString(),
          }),
        });

        if (!response.ok) {
          throw new Error("Save Failed");
        }

        alert("Project Added Successfully");
      }

      /* -----------------------------------------------------
         REFRESH PROJECT LIST
      ----------------------------------------------------- */

      await loadProjects();

      resetForm();

      setShowModal(false);
    } catch (err) {
      console.error("Save Project Error:", err);

      alert(
        err?.message ||
          "Something went wrong while saving the project."
      );
    }
  };

  /* =======================================================
     DELETE PROJECT
  ======================================================= */

  const handleDelete = async (id) => {
    if (!id) {
      alert("Project ID is missing.");
      return;
    }

    const confirmed = window.confirm(
      "Delete this project?"
    );

    if (!confirmed) {
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
      console.error("Delete Project Error:", err);

      alert(
        err?.message ||
          "Something went wrong while deleting the project."
      );
    }
  };

  /* =======================================================
     IMAGE PREVIEW
  ======================================================= */

  const getImagePreview = () => {
    if (!image) {
      return null;
    }

    if (typeof image === "string") {
      return image;
    }

    return URL.createObjectURL(image);
  };

  /* =======================================================
     JSX
  ======================================================= */

  return (
    <div className="project-page">

      {/* ===================================================
          HEADER
      =================================================== */}

      <div className="page-header">
        <h2>Project Management</h2>

        <button
          className="add-btn"
          onClick={handleAddProject}
        >
          + Add Images
        </button>
      </div>

      {/* ===================================================
          MODAL
      =================================================== */}

      {showModal && (
        <div className="modal-overlay">

          <div className="project-modal">

            {/* =============================================
                MODAL HEADER
            ============================================== */}

            <div className="modal-header">

              <h3>
                {editingProject
                  ? "Edit Project"
                  : "Add Project"}
              </h3>

              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setShowModal(false);
                }}
              >
                ✕
              </button>

            </div>

            {/* =============================================
                COMPANY
            ============================================== */}

            <div className="form-group">

              <label>Company</label>

              <select
                value={selectedCompany}
                onChange={(e) => {
                  const companyName = e.target.value;

                  setSelectedCompany(companyName);

                  /*
                    Whenever company changes,
                    reset category.
                  */

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

            {/* =============================================
                CATEGORY
            ============================================== */}

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

                  {currentCategories.length > 0 ? (
                    currentCategories.map((cat) => (
                      <option
                        key={cat}
                        value={cat}
                      >
                        {cat}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      No categories available
                    </option>
                  )}

                </select>

              </div>
            )}

            {/* =============================================
                PROJECT DETAILS
            ============================================== */}

            {selectedCategory && (
              <>
                {/* =========================================
                    PROJECT IMAGE
                ========================================== */}

                <div className="form-group">

                  <label>Project Image</label>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {

                      const selectedFile =
                        e.target.files?.[0];

                      if (selectedFile) {
                        setImage(selectedFile);
                      }

                    }}
                  />

                  {image && (
                    <img
                      src={getImagePreview()}
                      alt="Project Preview"
                      className="image-preview"
                    />
                  )}

                </div>

                {/* =========================================
                    PROJECT NAME
                ========================================== */}

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

                {/* =========================================
                    DESCRIPTION
                ========================================== */}

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

                {/* =========================================
                    SAVE / UPDATE
                ========================================== */}

                <div className="modal-footer">

                  <button
                    type="button"
                    className="save-btn"
                    onClick={handleSave}
                    disabled={loading}
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

      {/* ===================================================
          PROJECT LIST
      =================================================== */}

      <div className="project-list">

        {loading ? (
          <div className="empty-state">
            <h3>Loading Projects...</h3>
          </div>
        ) : projects.length === 0 ? (

          <div className="empty-state">

            <h3>No Projects Added</h3>

            <p>
              Click <b>+ Add Images</b> to create
              your first project.
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

                  <tr
                    key={
                      project.id ||
                      `${project.projectName}-${index}`
                    }
                  >

                    {/* =================================
                        NUMBER
                    ================================== */}

                    <td>
                      {index + 1}
                    </td>

                    {/* =================================
                        IMAGE
                    ================================== */}

                    <td>

                      {project.image ? (
                        <img
                          src={project.image}
                          alt={
                            project.projectName ||
                            "Project"
                          }
                          className="table-image"
                        />
                      ) : (
                        <div className="no-image">
                          No Image
                        </div>
                      )}

                    </td>

                    {/* =================================
                        COMPANY
                    ================================== */}

                    <td>
                      {project.company || "-"}
                    </td>

                    {/* =================================
                        CATEGORY
                    ================================== */}

                    <td>
                      {project.category || "-"}
                    </td>

                    {/* =================================
                        PROJECT NAME
                    ================================== */}

                    <td>
                      {project.projectName || "-"}
                    </td>

                    {/* =================================
                        DESCRIPTION
                    ================================== */}

                    <td className="desc-cell">
                      {project.description || "-"}
                    </td>

                    {/* =================================
                        STATUS
                    ================================== */}

                    <td>

                      <span className="status-badge">
                        Show
                      </span>

                    </td>

                    {/* =================================
                        ACTION
                    ================================== */}

                    <td>

                      <button
                        type="button"
                        className="edit-btn"
                        onClick={() =>
                          handleEditProject(project)
                        }
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(project.id)
                        }
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
