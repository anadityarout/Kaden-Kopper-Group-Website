import React, { useState, useEffect } from "react";
import "./HomeSlider.css";
 const API_URL =
  "https://a9vqiga5na.execute-api.ap-south-1.amazonaws.com/prod/homeslider";

const HomeSlider = () => {

  /* ==========================================
      STATES
  ========================================== */

  const [slides, setSlides] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [slideType, setSlideType] = useState("");
  const [editingSlide, setEditingSlide] = useState(null);
const [existingPreview, setExistingPreview] = useState("");

   const [formData, setFormData] = useState({
  name: "",
  description: "",
  image: null,
  video: null,
});

   /* ==========================================
    LOAD SLIDES FROM AWS
========================================== */

useEffect(() => {
  getSlides();
}, []);

const getSlides = async () => {
  try {

    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to load slides");
    }

    const data = await response.json();

    setSlides(data);

  } catch (error) {

    console.error("Error:", error);

  }
};

  

  /* ==========================================
      SAVE DATA
  ========================================== */

 

  /* ==========================================
      INPUT CHANGE
  ========================================== */

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  /* ==========================================
    FILE UPLOAD
========================================== */

const handleFile = (e) => {

  const file = e.target.files[0];

  if (!file) return;

  setFormData((prev) => ({
    ...prev,
    [e.target.name]: file,
  }));

};
  

  /* ==========================================
      RESET FORM
  ========================================== */

  const resetForm = () => {

  setShowOptions(false);

  setSlideType("");

  setEditingSlide(null);

  setExistingPreview("");

  setFormData({
    name: "",
    description: "",
    image: null,
    video: null,
  });

}; 

    /* ==========================================
      SAVE SLIDE
  ========================================== */

  const saveSlide = async () => {

  try {

    let file =
      slideType === "image"
        ? formData.image
        : formData.video;

    let fileUrl = editingSlide
      ? (slideType === "image"
          ? editingSlide.image
          : editingSlide.video)
      : "";

    let key = editingSlide ? editingSlide.key : "";

    /* ======================================
       Upload New File (Only if Selected)
    ====================================== */

    if (file) {

      const uploadResponse = await fetch(

        `${API_URL}?upload=true&fileName=${encodeURIComponent(
          file.name
        )}&fileType=${encodeURIComponent(file.type)}`

      );

      const uploadData = await uploadResponse.json();

      if (!uploadResponse.ok) {
        alert(uploadData.message);
        return;
      }

      const s3Response = await fetch(
        uploadData.uploadUrl,
        {
          method: "PUT",
          headers: {
            "Content-Type": file.type,
          },
          body: file,
        }
      );

      if (!s3Response.ok) {
        alert("S3 Upload Failed");
        return;
      }

      fileUrl = uploadData.fileUrl;
      key = uploadData.key;

    }

    /* ======================================
       ADD NEW SLIDE
    ====================================== */

    if (!editingSlide) {

      if (!file) {
        alert("Select a file");
        return;
      }

      const response = await fetch(API_URL, {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({

          type: slideType,
          name: formData.name,
          description: formData.description,

          image:
            slideType === "image"
              ? fileUrl
              : "",

          video:
            slideType === "video"
              ? fileUrl
              : "",

          key,

        }),

      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Slide Uploaded");

    }

    /* ======================================
       UPDATE SLIDE
    ====================================== */

    else {

      const response = await fetch(API_URL, {

        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({

          id: editingSlide.id,

          name: formData.name,

          description: formData.description,

          image:
            slideType === "image"
              ? fileUrl
              : "",

          video:
            slideType === "video"
              ? fileUrl
              : "",

          key,

          oldKey: editingSlide.key,

        }),

      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Slide Updated");

    }

    await getSlides();

    resetForm();

  }

  catch (err) {

    console.error(err);

    alert("Operation Failed");

  }

};

  /* ==========================================
      DELETE SLIDE
  ========================================== */

   const deleteSlide = async (id) => {

  if (!window.confirm("Delete Slide?")) return;

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

const data = await response.json();

if (!response.ok) {
  alert(data.message);
  return;
}

await getSlides();

alert("Slide Deleted");
  } catch (err) {

    console.error(err);

  }

};

/* ==========================================
      EDIT SLIDE
========================================== */

const handleEdit = (slide) => {

  setEditingSlide(slide);

  setShowOptions(true);

  setSlideType(slide.type);

  setFormData({
    name: slide.name,
    description: slide.description || "",
    image: null,
    video: null,
  });

  setExistingPreview(
    slide.type === "image"
      ? slide.image
      : slide.video
  );

};

  /* ==========================================
      EDIT SLIDE
  ========================================== */

  

  return (

    <div className="slider-admin">

      <div className="slider-header">

        <h2>Home Slider Management</h2>

        <button
          className="add-slide-btn"
          onClick={() => {
            resetForm();
            setShowOptions(true);
          }}
        >
          + Add Slide
        </button>

      </div>

      {/* Upload Type */}

      {showOptions && slideType === "" && (

        <div className="upload-type">

          <button
            onClick={() => setSlideType("image")}
          >
            Upload Image
          </button>

          <button
            onClick={() => setSlideType("video")}
          >
            Upload Video
          </button>

        </div>

      )}

      {/* IMAGE FORM */}

      {slideType === "image" && (

        <div className="upload-form">

          <h3>
  {editingSlide ? "Edit Image Slide" : "Image Slide"}
</h3>

          <input
            type="text"
            placeholder="Image Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <textarea
            placeholder="Image Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <label>Main Image</label>

          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleFile}
          />

          <div className="preview-container">

  {formData.image ? (

    <img
      src={URL.createObjectURL(formData.image)}
      alt="Preview"
      className="preview-image"
    />

  ) : (

    existingPreview && (

      <img
        src={existingPreview}
        alt="Current"
        className="preview-image"
      />

    )

  )}

</div>

          <div className="form-buttons">

  <button
    className="save-btn"
    onClick={saveSlide}
  >
    {editingSlide ? "Save Changes" : "Save Slide"}
  </button>

  {editingSlide && (

    <button
      className="cancel-btn"
      onClick={resetForm}
    >
      Cancel
    </button>

  )}

</div>

        </div>

      )}

      {/* VIDEO FORM */}

      {slideType === "video" && (

        <div className="upload-form">

          <h3>
  {editingSlide ? "Edit Video Slide" : "Video Slide"}
</h3>

          <input
            type="text"
            placeholder="Video Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <label>Upload Video</label>

          <input
            type="file"
            accept="video/*"
            name="video"
            onChange={handleFile}
          />

          <div>

  {formData.video ? (

    <video
      src={URL.createObjectURL(formData.video)}
      controls
      className="preview-video"
    />

  ) : (

    existingPreview && (

      <video
        src={existingPreview}
        controls
        className="preview-video"
      />

    )

  )}

</div>
          <div className="form-buttons">

  <button
    className="save-btn"
    onClick={saveSlide}
  >
    {editingSlide ? "Save Changes" : "Save Video"}
  </button>

  {editingSlide && (

    <button
      className="cancel-btn"
      onClick={resetForm}
    >
      Cancel
    </button>

  )}

</div>

        </div>

      )}
            {/* ==========================================
          SAVED SLIDES TABLE
      ========================================== */}

      <div className="slider-table">

        <table>

          <thead>

            <tr>
              <th>No</th>
              <th>Preview</th>
              <th>Type</th>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Created</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {slides.length === 0 ? (

              <tr>
                <td colSpan="8">
                  No Slides Found
                </td>
              </tr>

            ) : (

              slides.map((slide, index) => (

                <tr key={slide.id}>

                  <td>{index + 1}</td>

                  {/* Preview */}

                  <td>

                    {slide.type === "image" ? (

                      <img
                        src={slide.image}
                        alt={slide.name}
                        className="table-preview"
                      />

                    ) : (

                      <video
                        className="table-preview"
                        controls
                      >
                        <source
                          src={slide.video}
                          type="video/mp4"
                        />
                      </video>

                    )}

                  </td>

                  {/* Type */}

                  <td>
                    {slide.type}
                  </td>

                  {/* Name */}

                  <td>
                    {slide.name}
                  </td>

                  {/* Description */}

                  <td>

                    {slide.type === "image"
                      ? slide.description
                      : "-"}

                  </td>

                  {/* Status */}

                  <td>

                    <span className="status show">
                      Show
                    </span>

                  </td>

                  {/* Created */}

                  <td>

                    {new Date(
                      slide.id
                    ).toLocaleDateString()}

                  </td>

                  {/* Action */}

                  <td>

  <button
    className="edit-btn"
    onClick={() => handleEdit(slide)}
  >
    Edit
  </button>

  <button
    className="delete-btn"
    onClick={() => deleteSlide(slide.id)}
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

export default HomeSlider;