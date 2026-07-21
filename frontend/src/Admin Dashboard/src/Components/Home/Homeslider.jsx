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

    const file =
    

      slideType === "image"
        ? formData.image
        : formData.video;

    if (!file) {
      alert("Select a file");
      return;
    }

    /* ======================================
       GET PRESIGNED URL
    ====================================== */

    const uploadResponse = await fetch(

      `${API_URL}?upload=true&fileName=${encodeURIComponent(file.name)}&fileType=${encodeURIComponent(file.type)}`

    );

    const uploadData = await uploadResponse.json();

console.log("Upload URL Response:", uploadData);
console.log("Upload URL Status:", uploadResponse.status);
    if (!uploadResponse.ok) {
  alert(uploadData.message);
  return;
}

    /* ======================================
       UPLOAD FILE TO S3
    ====================================== */

     const s3Response = await fetch(uploadData.uploadUrl, {
  method: "PUT",
  headers: {
    "Content-Type": file.type,
  },
  body: file,
});

  console.log("S3 Status:", s3Response.status);
console.log("S3 OK:", s3Response.ok);

if (!s3Response.ok) {
  const text = await s3Response.text();
  console.log(text);

  alert("S3 Upload Failed");
  return;
}
    /* ======================================
       SAVE METADATA
    ====================================== */

    const saveResponse = await fetch(API_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    type: slideType,
    name: formData.name,
    description: formData.description,
    image: slideType === "image" ? uploadData.fileUrl : "",
    video: slideType === "video" ? uploadData.fileUrl : "",
    key: uploadData.key,
  }),
});

  const saveData = await saveResponse.json();

console.log("POST Status:", saveResponse.status);
console.log("POST Response:", saveData);

if (!saveResponse.ok) {
  alert(saveData.message);
  return;
}

    await getSlides();

    resetForm();

    alert("Slide Uploaded");

  } catch (err) {

    console.error(err);

    alert("Upload Failed");

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

          <h3>Image Slide</h3>

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

          {formData.image && (

  <div className="preview-container">

     <img
  src={URL.createObjectURL(formData.image)}
  alt="Preview"
  className="preview-image"
/>
  </div>

)}

          <button
  className="save-btn"
  onClick={saveSlide}
>
  Save Slide
</button>

        </div>

      )}

      {/* VIDEO FORM */}

      {slideType === "video" && (

        <div className="upload-form">

          <h3>Video Slide</h3>

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

          {formData.video && (

            <video
  src={URL.createObjectURL(formData.video)}
  controls
  className="preview-video"
/>

          )}

          <button
  className="save-btn"
  onClick={saveSlide}
>
  Save Video
</button>

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
                      className="delete-btn"
                      onClick={() =>
                        deleteSlide(slide.id)
                      }
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