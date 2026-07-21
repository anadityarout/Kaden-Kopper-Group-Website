import React, { useState, useEffect } from "react";
import "./CareerPage.css";

const API_URL =
  "https://a9vqiga5na.execute-api.ap-south-1.amazonaws.com/prod/career";

const CareerPage = () => {

  /* =====================================
      MODAL
  ===================================== */

  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("banner");

  /* =====================================
      CAREER BANNER
  ===================================== */

  const [bannerTitle, setBannerTitle] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [bannerKey, setBannerKey] = useState("");

  /* =====================================
      JOB OPENING
  ===================================== */

  const [jobName, setJobName] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobDate, setJobDate] = useState("");
  const [jobType, setJobType] = useState("Full Time");
  const [jobDescription, setJobDescription] = useState("");

  /* =====================================
      DATA
  ===================================== */

  const [careerBanners, setCareerBanners] = useState([]);
  const [jobOpenings, setJobOpenings] = useState([]);

  /* =====================================
      LOAD DATA
  ===================================== */

  useEffect(() => {

    loadCareer();

  }, []);

  const loadCareer = async () => {

    try {

      const res = await fetch(API_URL);

      const data = await res.json();

      setCareerBanners(data.banners || []);

      setJobOpenings(data.jobs || []);

    } catch (err) {

      console.log(err);

      alert("Unable to load career data.");

    }

  };

  /* =====================================
      IMAGE UPLOAD
  ===================================== */

  const handleBannerUpload = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    try {

      const res = await fetch(

        `${API_URL}?upload=true&fileName=${encodeURIComponent(
          file.name
        )}&fileType=${encodeURIComponent(file.type)}`

      );

      const uploadData = await res.json();

      if (!uploadData.success) {

        alert(uploadData.message);

        return;

      }

      await fetch(uploadData.uploadUrl, {

        method: "PUT",

        headers: {

          "Content-Type": file.type,

        },

        body: file,

      });

      setBannerImage(uploadData.fileUrl);

      setBannerKey(uploadData.key);

    } catch (err) {

      console.log(err);

      alert("Image upload failed.");

    }

  };

  /* =====================================
      CLEAR FORM
  ===================================== */

  const clearBannerForm = () => {

    setBannerTitle("");

    setBannerImage("");

    setBannerKey("");

  };

  const clearJobForm = () => {

    setJobName("");

    setJobRole("");

    setJobLocation("");

    setJobDate("");

    setJobType("Full Time");

    setJobDescription("");

  };

  /* =====================================
      OPEN MODAL
  ===================================== */

  const openBannerModal = () => {

    clearBannerForm();

    setActiveTab("banner");

    setShowModal(true);

  };

  const openJobModal = () => {

    clearJobForm();

    setActiveTab("job");

    setShowModal(true);

  };

  /* =====================================
      SAVE BANNER
  ===================================== */
    const saveBanner = async () => {

    if (!bannerImage) {

      alert("Please upload a banner image.");

      return;

    }

    try {

      const res = await fetch(API_URL, {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

        },

        body: JSON.stringify({

          type: "banner",

          title: bannerTitle,

          image: bannerImage,

          key: bannerKey,

        }),

      });

      const data = await res.json();

      if (!data.success) {

        alert(data.message);

        return;

      }

      await loadCareer();

      clearBannerForm();

      setShowModal(false);

    } catch (err) {

      console.log(err);

      alert("Failed to save banner.");

    }

  };

  /* =====================================
      SAVE JOB
  ===================================== */

  const saveJob = async () => {

    if (!jobName || !jobRole || !jobLocation) {

      alert("Please fill all required fields.");

      return;

    }

    try {

      const res = await fetch(API_URL, {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

        },

        body: JSON.stringify({

          type: "job",

          jobName,

          jobRole,

          jobLocation,

          jobDate,

          jobType,

          jobDescription,

        }),

      });

      const data = await res.json();

      if (!data.success) {

        alert(data.message);

        return;

      }

      await loadCareer();

      clearJobForm();

      setShowModal(false);

    } catch (err) {

      console.log(err);

      alert("Failed to save job.");

    }

  };

  /* =====================================
      DELETE BANNER
  ===================================== */

  const deleteBanner = async (id) => {

    if (!window.confirm("Delete this banner?")) return;

    try {

      const res = await fetch(API_URL, {

        method: "DELETE",

        headers: {

          "Content-Type": "application/json",

        },

        body: JSON.stringify({

          type: "banner",

          id,

        }),

      });

      const data = await res.json();

      if (!data.success) {

        alert(data.message);

        return;

      }

      await loadCareer();

    } catch (err) {

      console.log(err);

      alert("Failed to delete banner.");

    }

  };

  /* =====================================
      DELETE JOB
  ===================================== */

  const deleteJob = async (id) => {

    if (!window.confirm("Delete this job?")) return;

    try {

      const res = await fetch(API_URL, {

        method: "DELETE",

        headers: {

          "Content-Type": "application/json",

        },

        body: JSON.stringify({

          type: "job",

          id,

        }),

      });

      const data = await res.json();

      if (!data.success) {

        alert(data.message);

        return;

      }

      await loadCareer();

    } catch (err) {

      console.log(err);

      alert("Failed to delete job.");

    }

  };
    return (

    <div className="career-admin">

      {/* ==========================
          HEADER
      ========================== */}

      <div className="career-header">

        <div>

          <h2>Career Management</h2>

          <p>Manage Career Banner & Job Openings</p>

        </div>

        <div className="career-header-buttons">

          <button
            className="career-btn"
            onClick={openBannerModal}
          >
            + Career Banner
          </button>

          <button
            className="career-btn"
            onClick={openJobModal}
          >
            + Job Opening
          </button>

        </div>

      </div>

      {/* ==========================
          CAREER BANNERS
      ========================== */}

      <div className="career-section">

        <h3>Career Banner</h3>

        <table className="career-table">

          <thead>

            <tr>

              <th>No</th>

              <th>Banner</th>

              <th>Title</th>

              <th>Created</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {careerBanners.length === 0 ? (

              <tr>

                <td colSpan="5">

                  No Career Banner Available

                </td>

              </tr>

            ) : (

              careerBanners.map((banner, index) => (

                <tr key={banner.id}>

                  <td>{index + 1}</td>

                  <td>

                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="career-thumb"
                    />

                  </td>

                  <td>{banner.title}</td>

                  <td>{banner.created}</td>

                  <td>

                    <button
                      className="delete-btn"
                      onClick={() => deleteBanner(banner.id)}
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
            {/* ==========================
          JOB OPENINGS
      ========================== */}

      <div className="career-section">

        <h3>Job Openings</h3>

        <table className="career-table">

          <thead>

            <tr>

              <th>No</th>

              <th>Job Name</th>

              <th>Role</th>

              <th>Location</th>

              <th>Type</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {jobOpenings.length === 0 ? (

              <tr>

                <td colSpan="6">

                  No Job Openings

                </td>

              </tr>

            ) : (

              jobOpenings.map((job, index) => (

                <tr key={job.id}>

                  <td>{index + 1}</td>

                  <td>{job.jobName}</td>

                  <td>{job.jobRole}</td>

                  <td>{job.jobLocation}</td>

                  <td>{job.jobType}</td>

                  <td>

                    <button
                      className="delete-btn"
                      onClick={() => deleteJob(job.id)}
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

      {/* ==========================
          MODAL
      ========================== */}

      {showModal && (

        <div className="career-modal">

          <div className="career-popup">

            {/* ==========================
                POPUP HEADER
            ========================== */}

            <div className="popup-header">

              <h2>

                {activeTab === "banner"
                  ? "Add Career Banner"
                  : "Add Job Opening"}

              </h2>

              <button
                className="close-btn"
                onClick={() => {

                  setShowModal(false);

                  clearBannerForm();

                  clearJobForm();

                }}
              >
                ✕

              </button>

            </div>

            {/* ==========================
                TABS
            ========================== */}

            <div className="popup-tabs">

              <button
                className={
                  activeTab === "banner"
                    ? "active"
                    : ""
                }
                onClick={() => setActiveTab("banner")}
              >
                Career Banner
              </button>

              <button
                className={
                  activeTab === "job"
                    ? "active"
                    : ""
                }
                onClick={() => setActiveTab("job")}
              >
                Job Opening
              </button>

            </div>
                        {/* ==========================
                CAREER BANNER FORM
            ========================== */}

            {activeTab === "banner" && (

              <div className="popup-form">

                <label>

                  Banner Title

                </label>

                <input
                  type="text"
                  placeholder="Enter Banner Title"
                  value={bannerTitle}
                  onChange={(e) =>
                    setBannerTitle(e.target.value)
                  }
                />

                <label>

                  Upload Banner Image

                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBannerUpload}
                />

                {bannerImage && (

                  <div className="preview-box">

                    <img
                      src={bannerImage}
                      alt="Banner Preview"
                    />

                  </div>

                )}

                <div className="popup-buttons">

                  <button
                    className="save-btn"
                    onClick={saveBanner}
                  >
                    Save Banner
                  </button>

                </div>

              </div>

            )}

            {/* ==========================
                JOB OPENING FORM
            ========================== */}

            {activeTab === "job" && (

              <div className="popup-form">

                <label>

                  Job Name

                </label>

                <input
                  type="text"
                  placeholder="Software Engineer"
                  value={jobName}
                  onChange={(e) =>
                    setJobName(e.target.value)
                  }
                />

                <label>

                  Job Role

                </label>

                <input
                  type="text"
                  placeholder="Frontend Developer"
                  value={jobRole}
                  onChange={(e) =>
                    setJobRole(e.target.value)
                  }
                />

                <label>

                  Job Location

                </label>

                <input
                  type="text"
                  placeholder="Bhubaneswar"
                  value={jobLocation}
                  onChange={(e) =>
                    setJobLocation(e.target.value)
                  }
                />

                <label>

                  Opening Date

                </label>

                <input
                  type="date"
                  value={jobDate}
                  onChange={(e) =>
                    setJobDate(e.target.value)
                  }
                />

                <label>

                  Employment Type

                </label>

                <select
                  value={jobType}
                  onChange={(e) =>
                    setJobType(e.target.value)
                  }
                >
                  <option>Full Time</option>
                  <option>Part Time</option>
                  <option>Internship</option>
                  <option>Contract</option>
                </select>

                <label>

                  Job Description

                </label>

                <textarea
                  rows="6"
                  placeholder="Enter Job Description"
                  value={jobDescription}
                  onChange={(e) =>
                    setJobDescription(e.target.value)
                  }
                />

                <div className="popup-buttons">

                  <button
                    className="save-btn"
                    onClick={saveJob}
                  >
                    Save Job
                  </button>

                </div>

              </div>

            )}

          </div>

        </div>

      )}

    </div>

  );

};

export default CareerPage;