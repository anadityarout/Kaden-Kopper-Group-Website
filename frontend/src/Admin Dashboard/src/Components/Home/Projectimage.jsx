import React, { useRef, useState, useEffect } from "react";
import "./ProjectImage.css";
const API_URL =
  "https://a9vqiga5na.execute-api.ap-south-1.amazonaws.com/prod/catagory";

const ProjectImage = () => {
  const fileInputRef = useRef(null);

  const [projects, setProjects] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
   const [editingProject, setEditingProject] = useState(null);
   const [oldKey, setOldKey] = useState("");


  // =============================
  // Load Saved Projects
  // =============================

    const loadProjects = async () => {
  try {

    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to load projects");
    }

    const data = await response.json();

    setProjects(Array.isArray(data) ? data : []);

  } catch (err) {

    console.error(err);

  }
};

useEffect(() => {
  loadProjects();
}, []);

  // =============================
  // Upload Image
  // =============================

  const handleImageUpload = (e) => {

  const file = e.target.files[0];

  if (!file) return;

  setSelectedFile(file);

  setImage(URL.createObjectURL(file));

};
  // =============================
  // Save Project
  // =============================

   const handleSave = async () => {

  if (!name.trim() || !location.trim()) {
    alert("Please fill all fields.");
    return;
  }

  try {

    let imageUrl = image;
    let key = oldKey;

    /* ==========================
       Upload New Image (Optional)
    ========================== */

    if (selectedFile) {

      const uploadResponse = await fetch(
        `${API_URL}?upload=true&fileName=${encodeURIComponent(
          selectedFile.name
        )}&fileType=${encodeURIComponent(
          selectedFile.type
        )}`
      );

      if (!uploadResponse.ok) {
        throw new Error("Failed to get upload URL");
      }

      const uploadData = await uploadResponse.json();

      const upload = await fetch(uploadData.uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": selectedFile.type,
        },
        body: selectedFile,
      });

      if (!upload.ok) {
        throw new Error("Image upload failed");
      }

      imageUrl = uploadData.fileUrl;
      key = uploadData.key;
    }

    /* ==========================
       UPDATE PROJECT
    ========================== */

    if (editingProject) {

      const response = await fetch(API_URL, {

        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({

          id: editingProject.id,

          name,

          location,

          image: imageUrl,

          key,

          oldKey,

        }),

      });

      if (!response.ok) {
        throw new Error("Update failed");
      }

      alert("Project Updated Successfully");

    }

    /* ==========================
       ADD PROJECT
    ========================== */

    else {

      if (!selectedFile) {
        alert("Please select image.");
        return;
      }

      const response = await fetch(API_URL, {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({

          name,

          location,

          image: imageUrl,

          key,

        }),

      });

      if (!response.ok) {
        throw new Error("Project save failed");
      }

      alert("Project Added Successfully");

    }

    resetForm();

    await loadProjects();

  } catch (err) {

    console.error(err);

    alert(err.message);

  }

};

  // =============================
  // Reset Form
  // =============================

   const resetForm = () => {

  setEditingProject(null);

  setOldKey("");

  setSelectedFile(null);

  setImage("");

  setName("");

  setLocation("");

  setShowForm(false);

  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }

};

  
const handleEdit = (project) => {

  setEditingProject(project);

  setOldKey(project.key);

  setSelectedFile(null);

  setImage(project.image);

  setName(project.name);

  setLocation(project.location);

  setShowForm(true);

};
  // =============================
  // Delete Project
  // =============================

  const handleDelete = async (id) => {

  if (!window.confirm("Delete this project?"))
    return;

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
      throw new Error("Delete failed");
    }

    loadProjects();

  } catch (err) {

    console.error(err);

    alert(err.message);

  }

};
  return (
    <div className="project-image-admin">

      <div className="project-header">
        <h2>
  {editingProject
    ? "Edit Project"
    : "Add Project"}
</h2>

        <button
          className="add-project-btn"
          onClick={() => {

  resetForm();

  setEditingProject(null);

  setShowForm(true);

}}
        >
          + Add Project Image
        </button>
      </div>

      {showForm && (
        <div className="project-form">

          <div
  className="upload-box"
  onClick={() => fileInputRef.current.click()}
>

  {image ? (
    <img src={image} alt="preview" />
  ) : (
    <div className="upload-placeholder">
      <span>📷</span>
      <p>Click to Upload Image</p>
    </div>
  )}

  <input
    ref={fileInputRef}
    type="file"
    accept="image/*"
    hidden
    onChange={handleImageUpload}
  />

</div>

{editingProject && (
  <p
    style={{
      marginTop: "10px",
      color: "#777",
      fontSize: "13px",
    }}
  >
    Leave empty if you don't want to replace the image.
  </p>
)}

          <div className="form-fields">

            <input
              type="text"
              placeholder="Project Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Project Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <div className="form-buttons">

              <button
  className="save-btn"
  onClick={handleSave}
>
  {editingProject
    ? "Save Changes"
    : "Save Project"}
</button>

              <button
                className="cancel-btn"
                onClick={resetForm}
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}
           <div className="project-table">

<table>

<thead>

<tr>
<th>No</th>
<th>Preview</th>
<th>Project Name</th>
<th>Location</th>
<th>Created</th>
<th>Action</th>
</tr>

</thead>

<tbody>

{projects.length === 0 ? (

<tr>

<td colSpan="6" className="empty-row">
No Project Images Found
</td>

</tr>

) : (

projects.map((project,index)=>(

<tr key={project.id}>

<td>{index+1}</td>

<td>
<img
src={project.image}
alt=""
className="table-image"
/>
</td>

<td>{project.name}</td>

<td>{project.location}</td>

<td>{new Date(project.id).toLocaleDateString()}</td>

 <td>
 <div className="action-buttons">

  <button
    className="edit-btn"
    onClick={() => handleEdit(project)}
  >
    Edit
  </button>

  <button
    className="delete-btn"
    onClick={() => handleDelete(project.id)}
  >
    Delete
  </button>

</div>
</td>

</tr>

))

)}

</tbody>

</table>

</div>

    </div>
  );
};

export default ProjectImage;