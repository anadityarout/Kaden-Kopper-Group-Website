import React, { useState, useEffect, useRef } from "react";
import "./IndustryImage.css";

const API_URL =
  "https://a9vqiga5na.execute-api.ap-south-1.amazonaws.com/prod/industry";

const IndustryImage = () => {
  const slideInputRef = useRef(null);
  const operateInputRef = useRef(null);

  /* ===============================
      States
  ============================== */

  const [industryList, setIndustryList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    industrySlide: "",
    projectName: "",
    description: "",
    operateImage: "",
  });

  // Store selected files for S3 upload
  const [selectedFiles, setSelectedFiles] = useState({
    industrySlide: null,
    operateImage: null,
  });

  /* ===============================
      Load Industry From AWS
  ============================== */

  useEffect(() => {
    loadIndustry();
  }, []);

  const loadIndustry = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch industries");
      }

      const data = await response.json();

      setIndustryList(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Load Error:", err);
      setIndustryList([]);
    }
  };

  /* ===============================
      Reset Form
  ============================== */

  const resetForm = () => {
    setFormData({
      industrySlide: "",
      projectName: "",
      description: "",
      operateImage: "",
    });

    setSelectedFiles({
      industrySlide: null,
      operateImage: null,
    });

    if (slideInputRef.current) {
      slideInputRef.current.value = "";
    }

    if (operateInputRef.current) {
      operateInputRef.current.value = "";
    }
  };

  /* ===============================
      Add Industry
  ============================== */

  const handleAddIndustry = () => {
    resetForm();
    setShowModal(true);
  };
    /* ===============================
      Upload Image
  ============================== */

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];

    if (!file) return;

    if (type === "slide") {
      setSelectedFiles((prev) => ({
        ...prev,
        industrySlide: file,
      }));

      setFormData((prev) => ({
        ...prev,
        industrySlide: URL.createObjectURL(file),
      }));
    } else {
      setSelectedFiles((prev) => ({
        ...prev,
        operateImage: file,
      }));

      setFormData((prev) => ({
        ...prev,
        operateImage: URL.createObjectURL(file),
      }));
    }
  };

  /* ===============================
      Upload File To S3
  ============================== */

  const uploadFile = async (file) => {
    if (!file) return "";

    // Get presigned upload URL
    const uploadRes = await fetch(
      `${API_URL}?upload=true&fileName=${encodeURIComponent(
        file.name
      )}&fileType=${encodeURIComponent(file.type)}`
    );

    if (!uploadRes.ok) {
      throw new Error("Unable to get upload URL");
    }

    const uploadData = await uploadRes.json();

    // Upload directly to S3
    await fetch(uploadData.uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    return {
  fileUrl: uploadData.fileUrl,
  key: uploadData.key,
};
  };

  /* ===============================
      Save Industry
  ============================== */

  const handleSave = async () => {
    try {
      if (
        !selectedFiles.industrySlide &&
        !selectedFiles.operateImage
      ) {
        alert("Please upload at least one image.");
        return;
      }

      let industrySlide = {
  fileUrl: "",
  key: "",
};

let operateImage = {
  fileUrl: "",
  key: "",
};

if (selectedFiles.industrySlide) {
  industrySlide = await uploadFile(
    selectedFiles.industrySlide
  );
}

if (selectedFiles.operateImage) {
  operateImage = await uploadFile(
    selectedFiles.operateImage
  );
}

const body = {
  id: Date.now(),

  industrySlide: industrySlide.fileUrl,
  industrySlideKey: industrySlide.key,

  projectName: formData.projectName,
  description: formData.description,

  operateImage: operateImage.fileUrl,
  operateImageKey: operateImage.key,

  created: new Date().toLocaleDateString(),
};

      const saveRes = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!saveRes.ok) {
        throw new Error("Failed to save industry");
      }

      await loadIndustry();

      resetForm();

      setShowModal(false);

      alert("Industry saved successfully.");
    } catch (err) {
      console.error(err);
      alert("Error saving industry.");
    }
  };
    /* ===============================
      Delete Industry
  ============================== */

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this Industry?")) return;

    try {
      const response = await fetch(`${API_URL}?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete industry");
      }

      await loadIndustry();

      alert("Industry deleted successfully.");
    } catch (err) {
      console.error("Delete Error:", err);
      alert("Failed to delete industry.");
    }
  };
  return (
  <div className="industry-admin">

    {/* Header */}

    <div className="industry-header">
      <h2>Industry Image</h2>

      <button
        className="add-industry-btn"
        onClick={handleAddIndustry}
      >
        + Add Industry
      </button>
    </div>

    {/* ================= TABLE ================= */}

    <div className="industry-table">
      <table>

        <thead>
          <tr>
            <th>No</th>
            <th>Industry Slide</th>
            <th>Industries We Operate In</th>
            <th>Created</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {industryList.length === 0 ? (

            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "center",
                  padding: "30px",
                }}
              >
                No Industry Added
              </td>
            </tr>

          ) : (

            industryList.map((item, index) => (

              <tr key={item.id || index}>

                <td>{index + 1}</td>

                <td>
                  {item.industrySlide ? (
                    <img
                      src={item.industrySlide}
                      alt="Industry Slide"
                      className="table-image"
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>

                <td>
                  {item.operateImage ? (
                    <img
                      src={item.operateImage}
                      alt="Operate"
                      className="table-image"
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>

                <td>{item.created}</td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item.id)}
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

    {/* ================= MODAL ================= */}

    {showModal && (
      <div className="modal-overlay">
        <div className="modal-box">

          <h3>Add Industry</h3>

          {/* Industry Slide */}

          <div className="upload-section">

            <label>Industry Slide</label>

            <div
              className="upload-box"
              onClick={() => slideInputRef.current.click()}
            >
              {formData.industrySlide ? (
                <img
                  src={formData.industrySlide}
                  alt="Industry Slide"
                  className="preview-img"
                />
              ) : (
                <span>Click to Upload</span>
              )}
            </div>

            <input
              type="file"
              hidden
              ref={slideInputRef}
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "slide")}
            />

          </div>

          {/* Industries We Operate In */}

          <div className="upload-section">

            <label>Industries We Operate In</label>

            <div className="input-group">

              <label>Project Name</label>

              <input
                type="text"
                className="industry-input"
                placeholder="Enter Project Name"
                value={formData.projectName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    projectName: e.target.value,
                  })
                }
              />

            </div>

            <div className="input-group">

              <label>Description</label>

              <textarea
                className="industry-textarea"
                rows="4"
                placeholder="Enter Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
              />

            </div>

            <div
              className="upload-box"
              onClick={() => operateInputRef.current.click()}
            >
              {formData.operateImage ? (
                <img
                  src={formData.operateImage}
                  alt="Operate"
                  className="preview-img"
                />
              ) : (
                <span>Click to Upload</span>
              )}
            </div>

            <input
              type="file"
              hidden
              ref={operateInputRef}
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "operate")}
            />

          </div>

          <div className="modal-buttons">

            <button
              className="cancel-btn"
              onClick={() => {
                resetForm();
                setShowModal(false);
              }}
            >
              Cancel
            </button>

            <button
              className="save-btn"
              onClick={handleSave}
            >
              Save
            </button>

          </div>

        </div>
      </div>
    )}

  </div>
);

};

export default IndustryImage;
