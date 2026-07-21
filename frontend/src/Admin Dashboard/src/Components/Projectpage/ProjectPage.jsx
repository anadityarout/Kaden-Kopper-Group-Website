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

  const [showModal, setShowModal] = useState(false);

  const [selectedCompany, setSelectedCompany] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");

  const [projectName, setProjectName] = useState("");

  const [description, setDescription] = useState("");

  const [image, setImage] = useState(null);
  const [projects, setProjects] = useState([]);

  const currentCompany = companies.find(
    (item) => item.name === selectedCompany
  );

  const loadProjects = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    setProjects(data);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  loadProjects();
}, []);

const uploadImage = async (file) => {
  const response = await fetch(
    `${API_URL}?upload=true&fileName=${encodeURIComponent(
      file.name
    )}&fileType=${encodeURIComponent(file.type)}`
  );

  const uploadData = await response.json();

  await fetch(uploadData.uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  return uploadData.fileUrl;
};

  return (
    <div className="project-page">

      <div className="page-header">

        <h2>Project Management</h2>

        <button
          className="add-btn"
          onClick={() => {
            setShowModal(true);
            setSelectedCompany("");
            setSelectedCategory("");
            setProjectName("");
            setDescription("");
            setImage(null);
          }}
        >
          + Add Images
        </button>

      </div>

      {/* ==========================
            MODAL
      =========================== */}

      {showModal && (

        <div className="modal-overlay">

          <div className="project-modal">

            <div className="modal-header">

              <h3>Add Project</h3>

              <button
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>

            </div>

            {/* Company */}

            <div className="form-group">

              <label>Company</label>

              <select
                value={selectedCompany}
                onChange={(e) => {
                  setSelectedCompany(e.target.value);
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

            {/* Category */}

            {selectedCompany && (

              <div className="form-group">

                <label>Category</label>

                <select
                  value={selectedCategory}
                  onChange={(e) =>
                    setSelectedCategory(e.target.value)
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

            {/* Remaining fields */}

            {selectedCategory && (

              <>
                          {/* Project Image */}

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
  src={URL.createObjectURL(image)}
  alt="Preview"
  className="image-preview"
/>
              )}

            </div>

            {/* Project Name */}

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

            {/* Description */}

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

            {/* Save */}

            <div className="modal-footer">

             <button
  className="save-btn"
    onClick={async () => {
  if (
    !selectedCompany ||
    !selectedCategory ||
    !projectName.trim() ||
    !description.trim() ||
    !image
  ) {
    alert("Please fill all fields.");
    return;
  }

  try {
    const imageUrl = await uploadImage(image);

    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        company: selectedCompany,
        category: selectedCategory,
        projectName,
        description,
        image: imageUrl,
      }),
    });

    await loadProjects();

    setSelectedCompany("");
    setSelectedCategory("");
    setProjectName("");
    setDescription("");
    setImage(null);

    setShowModal(false);

    alert("Project Added Successfully");
  } catch (error) {
    console.error(error);
    alert("Upload Failed");
  }
}}
>
  Save Project
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
      <p>Click <b>+ Add Images</b> to create your first project.</p>
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
                  className="delete-btn"
                  onClick={async () => {

  if (!window.confirm("Delete this project?")) return;

  await fetch(API_URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: project.id,
    }),
  });

  loadProjects();

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