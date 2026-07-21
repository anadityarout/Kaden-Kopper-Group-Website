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

  if (!selectedFile || !name || !location) {
    alert("Please fill all fields.");
    return;
  }

  try {

    /* ==========================
       GET UPLOAD URL
    ========================== */

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

    const uploadData =
      await uploadResponse.json();

    /* ==========================
       UPLOAD IMAGE TO S3
    ========================== */

    const upload = await fetch(
      uploadData.uploadUrl,
      {
        method: "PUT",
        headers: {
          "Content-Type": selectedFile.type,
        },
        body: selectedFile,
      }
    );

    if (!upload.ok) {
      throw new Error("Image upload failed");
    }

    /* ==========================
       SAVE PROJECT
    ========================== */

    const save = await fetch(API_URL, {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({

        name,

        location,

        image: uploadData.fileUrl,

        key: uploadData.key,

      }),

    });

    if (!save.ok) {
      throw new Error("Project save failed");
    }

    alert("Project Added Successfully");

    resetForm();

    loadProjects();

  } catch (err) {

    console.error(err);

    alert(err.message);

  }

};

  // =============================
  // Reset Form
  // =============================

   const resetForm = () => {

  setSelectedFile(null);

  setImage("");
  setName("");
  setLocation("");

  setShowForm(false);

  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }

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
        <h2>Project Images</h2>

        <button
          className="add-project-btn"
          onClick={() => {
            resetForm();
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
                Save Project
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
  <button
    className="delete-btn"
    onClick={() => handleDelete(project.id)}
  >
    Delete
  </button>
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