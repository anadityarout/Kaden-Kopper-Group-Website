import React, { useState, useEffect, useRef } from "react";
import "./AboutImage.css";

const API_URL =
  "https://a9vqiga5na.execute-api.ap-south-1.amazonaws.com/prod/about";

const defaultImages = {
  aboutSlide: "",
  whoWeAre: "",
  ourValues: "",
  ourApproach: "",
  whatDrivesUs: "",
};

const AboutImage = () => {

  const [aboutList, setAboutList] = useState([]);
  const [editing, setEditing] = useState(false);

const [oldKeys, setOldKeys] = useState({
  aboutSlideKey: "",
  whoWeAreKey: "",
  ourValuesKey: "",
  ourApproachKey: "",
  whatDrivesUsKey: "",
});

  const [showForm, setShowForm] = useState(false);

  const [images, setImages] = useState(defaultImages);

  const [selectedFiles, setSelectedFiles] = useState({
    aboutSlide: null,
    whoWeAre: null,
    ourValues: null,
    ourApproach: null,
    whatDrivesUs: null,
  });

  const inputRefs = useRef({
    aboutSlide: React.createRef(),
    whoWeAre: React.createRef(),
    ourValues: React.createRef(),
    ourApproach: React.createRef(),
    whatDrivesUs: React.createRef(),
  });

  /* ==========================================
      LOAD ABOUT
  ========================================== */

  const loadAbout = async () => {

    try {

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to load About Images");
      }

      const data = await response.json();

      setAboutList(Array.isArray(data) ? data : []);

    } catch (err) {

      console.error(err);

    }

  };

  useEffect(() => {

    loadAbout();

  }, []);

  /* ==========================================
      IMAGE CHANGE
  ========================================== */

  const handleImageChange = (key, file) => {

    if (!file) return;

    setSelectedFiles((prev) => ({
      ...prev,
      [key]: file,
    }));

    setImages((prev) => ({
      ...prev,
      [key]: URL.createObjectURL(file),
    }));

  };

  /* ==========================================
      OPEN FILE PICKER
  ========================================== */

  const openPicker = (key) => {

    inputRefs.current[key].current.click();

  };

  /* ==========================================
      UPLOAD IMAGE
  ========================================== */

  const uploadImage = async (file) => {

    if (!file) {

      return {
        image: "",
        key: "",
      };

    }

    const uploadResponse = await fetch(

      `${API_URL}?upload=true&fileName=${encodeURIComponent(
        file.name
      )}&fileType=${encodeURIComponent(file.type)}`

    );

    if (!uploadResponse.ok) {

      throw new Error("Unable to create upload URL");

    }

    const uploadData = await uploadResponse.json();

    const upload = await fetch(uploadData.uploadUrl, {

      method: "PUT",

      headers: {
        "Content-Type": file.type,
      },

      body: file,

    });

    if (!upload.ok) {

      throw new Error("Image Upload Failed");

    }

    return {

      image: uploadData.fileUrl,

      key: uploadData.key,

    };

  };

  /* ==========================================
      SAVE ABOUT
  ========================================== */
    
  const saveAbout = async () => {

  try {

    let aboutSlide = {
      image: images.aboutSlide,
      key: oldKeys.aboutSlideKey,
    };

    let whoWeAre = {
      image: images.whoWeAre,
      key: oldKeys.whoWeAreKey,
    };

    let ourValues = {
      image: images.ourValues,
      key: oldKeys.ourValuesKey,
    };

    let ourApproach = {
      image: images.ourApproach,
      key: oldKeys.ourApproachKey,
    };

    let whatDrivesUs = {
      image: images.whatDrivesUs,
      key: oldKeys.whatDrivesUsKey,
    };

    /* =============================
       Upload only replaced images
    ============================== */

    if (selectedFiles.aboutSlide) {
      aboutSlide = await uploadImage(selectedFiles.aboutSlide);
    }

    if (selectedFiles.whoWeAre) {
      whoWeAre = await uploadImage(selectedFiles.whoWeAre);
    }

    if (selectedFiles.ourValues) {
      ourValues = await uploadImage(selectedFiles.ourValues);
    }

    if (selectedFiles.ourApproach) {
      ourApproach = await uploadImage(selectedFiles.ourApproach);
    }

    if (selectedFiles.whatDrivesUs) {
      whatDrivesUs = await uploadImage(selectedFiles.whatDrivesUs);
    }

    /* =============================
       EDIT
    ============================== */

    if (editing) {

      const response = await fetch(API_URL, {

        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({

          aboutSlide: aboutSlide.image,
          aboutSlideKey: aboutSlide.key,
          oldAboutSlideKey: oldKeys.aboutSlideKey,

          whoWeAre: whoWeAre.image,
          whoWeAreKey: whoWeAre.key,
          oldWhoWeAreKey: oldKeys.whoWeAreKey,

          ourValues: ourValues.image,
          ourValuesKey: ourValues.key,
          oldOurValuesKey: oldKeys.ourValuesKey,

          ourApproach: ourApproach.image,
          ourApproachKey: ourApproach.key,
          oldOurApproachKey: oldKeys.ourApproachKey,

          whatDrivesUs: whatDrivesUs.image,
          whatDrivesUsKey: whatDrivesUs.key,
          oldWhatDrivesUsKey: oldKeys.whatDrivesUsKey,

        }),

      });

      if (!response.ok) {
        throw new Error("Update Failed");
      }

      alert("About Images Updated");

    }

    /* =============================
       ADD
    ============================== */

    else {

      const response = await fetch(API_URL, {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({

          aboutSlide: aboutSlide.image,
          aboutSlideKey: aboutSlide.key,

          whoWeAre: whoWeAre.image,
          whoWeAreKey: whoWeAre.key,

          ourValues: ourValues.image,
          ourValuesKey: ourValues.key,

          ourApproach: ourApproach.image,
          ourApproachKey: ourApproach.key,

          whatDrivesUs: whatDrivesUs.image,
          whatDrivesUsKey: whatDrivesUs.key,

        }),

      });

      if (!response.ok) {
        throw new Error("Save Failed");
      }

      alert("About Images Saved");

    }

    await loadAbout();

    setShowForm(false);

    setEditing(false);

    setImages(defaultImages);

    setSelectedFiles({
      aboutSlide: null,
      whoWeAre: null,
      ourValues: null,
      ourApproach: null,
      whatDrivesUs: null,
    });

  } catch (err) {

    console.error(err);

    alert(err.message);

  }

};
  
    /* ==========================================
      DELETE ABOUT
  ========================================== */

  const deleteAbout = async () => {

    try {

      if (aboutList.length === 0) return;

      const response = await fetch(API_URL, {

        method: "DELETE",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          id: aboutList[0].id,
        }),

      });

      if (!response.ok) {
        throw new Error("Delete Failed");
      }

      await loadAbout();

      setImages(defaultImages);

      setSelectedFiles({
        aboutSlide: null,
        whoWeAre: null,
        ourValues: null,
        ourApproach: null,
        whatDrivesUs: null,
      });

      setShowForm(false);

      alert("About Images Deleted");

    } catch (err) {

      console.error(err);

      alert("Delete Failed");

    }

  };

  /* ==========================================
      OPEN FORM
  ========================================== */

  const openForm = () => {

  if (aboutList.length > 0) {

    const item = aboutList[0];

    setEditing(true);

    setImages({

      aboutSlide: item.aboutSlide || "",

      whoWeAre: item.whoWeAre || "",

      ourValues: item.ourValues || "",

      ourApproach: item.ourApproach || "",

      whatDrivesUs: item.whatDrivesUs || "",

    });

    setOldKeys({

      aboutSlideKey: item.aboutSlideKey || "",

      whoWeAreKey: item.whoWeAreKey || "",

      ourValuesKey: item.ourValuesKey || "",

      ourApproachKey: item.ourApproachKey || "",

      whatDrivesUsKey: item.whatDrivesUsKey || "",

    });

  } else {

    setEditing(false);

    setImages(defaultImages);

  }

  setShowForm(true);

};


  return (

    <div className="about-image-admin">

      <div className="about-header">

        <h2>About Image</h2>

        <button
className="add-about-btn"
onClick={() => {

    openForm();

}}
>
          {aboutList.length > 0
            ? "Edit About Images"
            : "+ Add About Image"}
        </button>

      </div>

      {showForm && (

        <div className="about-form">

          <h3>About Images</h3>

          {/* ================= About Slide ================= */}

          <div className="upload-group">

            <label>About Slide</label>

            {images.aboutSlide && (
              <img
                src={images.aboutSlide}
                alt="About Slide"
                className="preview-image"
              />
            )}

            <input
              type="file"
              accept="image/*"
              ref={inputRefs.current.aboutSlide}
              style={{ display: "none" }}
              onChange={(e) =>
                handleImageChange(
                  "aboutSlide",
                  e.target.files[0]
                )
              }
            />

            <button
              type="button"
              className="choose-btn"
              onClick={() => openPicker("aboutSlide")}
            >
              Choose Image
            </button>

          </div>

          {/* ================= Who We Are ================= */}

          <div className="upload-group">

            <label>Who We Are</label>

            {images.whoWeAre && (
              <img
                src={images.whoWeAre}
                alt="Who We Are"
                className="preview-image"
              />
            )}

            <input
              type="file"
              accept="image/*"
              ref={inputRefs.current.whoWeAre}
              style={{ display: "none" }}
              onChange={(e) =>
                handleImageChange(
                  "whoWeAre",
                  e.target.files[0]
                )
              }
            />

            <button
              type="button"
              className="choose-btn"
              onClick={() => openPicker("whoWeAre")}
            >
              Choose Image
            </button>

          </div>

          {/* ================= Our Values ================= */}

          <div className="upload-group">

            <label>Our Values</label>

            {images.ourValues && (
              <img
                src={images.ourValues}
                alt="Our Values"
                className="preview-image"
              />
            )}

            <input
              type="file"
              accept="image/*"
              ref={inputRefs.current.ourValues}
              style={{ display: "none" }}
              onChange={(e) =>
                handleImageChange(
                  "ourValues",
                  e.target.files[0]
                )
              }
            />

            <button
              type="button"
              className="choose-btn"
              onClick={() => openPicker("ourValues")}
            >
              Choose Image
            </button>

          </div>

          {/* ================= Our Approach ================= */}

          <div className="upload-group">

            <label>Our Approach</label>

            {images.ourApproach && (
              <img
                src={images.ourApproach}
                alt="Our Approach"
                className="preview-image"
              />
            )}

            <input
              type="file"
              accept="image/*"
              ref={inputRefs.current.ourApproach}
              style={{ display: "none" }}
              onChange={(e) =>
                handleImageChange(
                  "ourApproach",
                  e.target.files[0]
                )
              }
            />

            <button
              type="button"
              className="choose-btn"
              onClick={() => openPicker("ourApproach")}
            >
              Choose Image
            </button>

          </div>
                    {/* ================= What Drives Us ================= */}

          <div className="upload-group">

            <label>What Drives Us</label>

            {images.whatDrivesUs && (
              <img
                src={images.whatDrivesUs}
                alt="What Drives Us"
                className="preview-image"
              />
            )}

            <input
              type="file"
              accept="image/*"
              ref={inputRefs.current.whatDrivesUs}
              style={{ display: "none" }}
              onChange={(e) =>
                handleImageChange(
                  "whatDrivesUs",
                  e.target.files[0]
                )
              }
            />

            <button
              type="button"
              className="choose-btn"
              onClick={() => openPicker("whatDrivesUs")}
            >
              Choose Image
            </button>

          </div>

          <div className="form-buttons">

            <button
              className="save-btn"
              onClick={saveAbout}
            >
              Save
            </button>

            <button
              className="cancel-btn"
              onClick={() => {

                setShowForm(false);

                setImages(defaultImages);

                setSelectedFiles({
                  aboutSlide: null,
                  whoWeAre: null,
                  ourValues: null,
                  ourApproach: null,
                  whatDrivesUs: null,
                });

              }}
            >
              Cancel
            </button>

          </div>

        </div>

      )}

      {/* ================= TABLE ================= */}

      <div className="about-table-section">

        <table className="about-table">

          <thead>

            <tr>

              <th>No</th>

              <th>About Slide</th>

              <th>Who We Are</th>

              <th>Our Values</th>

              <th>Our Approach</th>

              <th>What Drives Us</th>

              <th>Created</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>
                        {aboutList.length === 0 ? (

              <tr>

                <td
                  colSpan="8"
                  style={{
                    textAlign: "center",
                    padding: "30px",
                  }}
                >
                  No About Images Found
                </td>

              </tr>

            ) : (

              aboutList.map((item, index) => (

                <tr key={index}>

                  <td>{index + 1}</td>

                  <td>
                    {item.aboutSlide && (
                      <img
                        src={item.aboutSlide}
                        alt="About Slide"
                        className="table-image"
                      />
                    )}
                  </td>

                  <td>
                    {item.whoWeAre && (
                      <img
                        src={item.whoWeAre}
                        alt="Who We Are"
                        className="table-image"
                      />
                    )}
                  </td>

                  <td>
                    {item.ourValues && (
                      <img
                        src={item.ourValues}
                        alt="Our Values"
                        className="table-image"
                      />
                    )}
                  </td>

                  <td>
                    {item.ourApproach && (
                      <img
                        src={item.ourApproach}
                        alt="Our Approach"
                        className="table-image"
                      />
                    )}
                  </td>

                  <td>
                    {item.whatDrivesUs && (
                      <img
                        src={item.whatDrivesUs}
                        alt="What Drives Us"
                        className="table-image"
                      />
                    )}
                  </td>

                  <td>{item.created || "-"}</td>

                 <td>

  <button
    className="edit-btn"
    onClick={() => openForm()}
  >
    Edit
  </button>

  <button
    className="delete-btn"
    onClick={deleteAbout}
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

export default AboutImage;