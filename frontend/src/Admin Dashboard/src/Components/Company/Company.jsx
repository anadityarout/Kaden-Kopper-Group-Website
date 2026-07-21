import React, { useState, useEffect, useRef } from "react";
import "./Company.css";
const API_URL =
  "https://a9vqiga5na.execute-api.ap-south-1.amazonaws.com/prod/company-page";

const Company = () => {

  /* ==========================================
      REFS
  ========================================== */

  const heroInputRef = useRef(null);
  const fileInputRef = useRef(null);

  /* ==========================================
      STATES
  ========================================== */

  const [showForm, setShowForm] = useState(false);

  const [companies, setCompanies] = useState([]);

   const [companyHeroImage, setCompanyHeroImage] = useState(null);
const [companyImage, setCompanyImage] = useState(null);

const [heroPreview, setHeroPreview] = useState("");
const [logoPreview, setLogoPreview] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [companyLink, setCompanyLink] = useState("");

  /* ==========================================
      LOAD DATA
  ========================================== */

   const loadCompanies = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (Array.isArray(data)) {
      setCompanies(data);
    } else {
      setCompanies([]);
    }
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  loadCompanies();
}, []);

   

  /* ==========================================
      OPEN PICKERS
  ========================================== */

  const openHeroPicker = () => {

    if (heroInputRef.current) {
      heroInputRef.current.click();
    }

  };

  const openFilePicker = () => {

    if (fileInputRef.current) {
      fileInputRef.current.click();
    }

  };

  /* ==========================================
      HERO IMAGE UPLOAD
  ========================================== */

    const handleHeroImageUpload = (e) => {

  const file = e.target.files[0];

  if (!file) return;

  setCompanyHeroImage(file);

  setHeroPreview(URL.createObjectURL(file));

};
  /* ==========================================
      LOGO UPLOAD
  ========================================== */

   const handleImageUpload = (e) => {

  const file = e.target.files[0];

  if (!file) return;

  setCompanyImage(file);

  setLogoPreview(URL.createObjectURL(file));

};

   /* ==========================================
    UPLOAD IMAGE TO S3
========================================== */

const uploadFile = async (file) => {

  if (!file) {
    return {
      url: "",
      key: "",
    };
  }

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

  return {
    url: uploadData.fileUrl,
    key: uploadData.key,
  };

};

  /* ==========================================
      CLEAR FORM
  ========================================== */

  const clearForm = () => {

     setCompanyHeroImage(null);
setCompanyImage(null);

setHeroPreview("");
setLogoPreview("");

    setCompanyName("");
    setCompanyDescription("");
    setCompanyLink("");

    if (heroInputRef.current) {
      heroInputRef.current.value = "";
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

  };

  /* ==========================================
      SAVE COMPANY
  ========================================== */

     const saveCompany = async () => {

  const hasData =
    companyHeroImage ||
    companyImage ||
    companyName.trim() ||
    companyDescription.trim() ||
    companyLink.trim();

  if (!hasData) {
    alert("Please enter at least one field.");
    return;
  }

  try {

    console.log("Hero File:", companyHeroImage);
console.log("Logo File:", companyImage);

const heroUpload = await uploadFile(companyHeroImage);

const logoUpload = await uploadFile(companyImage);

console.log("Hero Upload:", heroUpload);
console.log("Logo Upload:", logoUpload);

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({

        heroImage: heroUpload.url,
        heroImageKey: heroUpload.key,

        image: logoUpload.url,
        imageKey: logoUpload.key,

        name: companyName,
        description: companyDescription,
        link: companyLink,

      }),
    });

    if (!response.ok) {
      throw new Error("Failed to save company");
    }

    await loadCompanies();

    clearForm();

    setShowForm(false);

    alert("Company saved successfully.");

  } catch (error) {

    console.error(error);

    alert("Failed to save company.");

  }

};
  /* ==========================================
      DELETE COMPANY
  ========================================== */

   const deleteCompany = async (id) => {

  const ok = window.confirm("Delete this company?");

  if (!ok) return;

  try {

    const response = await fetch(
      `${API_URL}?id=${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Delete failed");
    }

    await loadCompanies();

    alert("Company deleted successfully.");

  } catch (error) {

    console.error(error);

    alert("Failed to delete company.");

  }

};
  return (
    <div className="company-admin">

  {/* ==========================================
      HEADER
  ========================================== */}

  <div className="company-header">

    <div>

      <h1>Company Management</h1>

      <p>
        Add your companies with hero banner,
        logo, description and website.
      </p>

    </div>

    {!showForm && (

      <button
        className="add-company-btn"
        onClick={() => {

          clearForm();

          setShowForm(true);

        }}
      >
        + Add Company
      </button>

    )}

  </div>

  <div className="company-container">

    {/* ==========================================
        ADD COMPANY FORM
    ========================================== */}

    {showForm && (

      <div className="company-form">

        <h2>Add Company</h2>

        {/* ==========================
            HERO BANNER
        ========================== */}

        <div className="form-group">

          <label>Company Hero Banner</label>

          <div
            className="upload-box"
            onClick={openHeroPicker}
          >

            {companyHeroImage ? (

  <img
    src={heroPreview || companyHeroImage}
    alt="Hero Banner"
  />

) : (

              <>

                <div className="upload-icon">
                  📷
                </div>

                <h3>
                  Upload Hero Banner
                </h3>

                <p>
                  Click here to upload image
                </p>

              </>

            )}

          </div>

          <input
            type="file"
            ref={heroInputRef}
            accept="image/*"
            onChange={handleHeroImageUpload}
            className="hidden-file-input"
          />

        </div>

        {/* ==========================
            COMPANY LOGO
        ========================== */}

        <div className="form-group">

          <label>Company Logo</label>

          <div
            className="upload-box"
            onClick={openFilePicker}
          >

            {companyImage ? (

               <img
  src={logoPreview || companyImage}
  alt="Company Logo"
/>

            ) : (

              <>

                <div className="upload-icon">
                  📷
                </div>

                <h3>
                  Upload Company Logo
                </h3>

                <p>
                  Click here to upload image
                </p>

              </>

            )}

          </div>

          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden-file-input"
          />

        </div>

        {/* ==========================
            COMPANY NAME
        ========================== */}

        <div className="form-group">

          <label>
            Company Name
          </label>

          <input
            type="text"
            placeholder="Enter Company Name"
            value={companyName}
            onChange={(e) =>
              setCompanyName(e.target.value)
            }
          />

        </div>

        {/* ==========================
            DESCRIPTION
        ========================== */}

        <div className="form-group">

          <label>
            Description
          </label>

          <textarea
            rows="5"
            placeholder="Enter Company Description..."
            value={companyDescription}
            onChange={(e) =>
              setCompanyDescription(e.target.value)
            }
          />

        </div>

        {/* ==========================
            WEBSITE
        ========================== */}

        <div className="form-group">

          <label>
            Website Link
          </label>

          <input
            type="text"
            placeholder="https://company.com"
            value={companyLink}
            onChange={(e) =>
              setCompanyLink(e.target.value)
            }
          />

        </div>

        {/* ==========================
            BUTTONS
        ========================== */}

        <div className="button-group">

          <button
            className="save-btn"
            onClick={saveCompany}
          >
            Save Company
          </button>

          <button
            className="cancel-btn"
            onClick={() => {

              clearForm();

              setShowForm(false);

            }}
          >
            Cancel
          </button>

        </div>

      </div>

    )}

    {/* ==========================================
        COMPANY LIST STARTS HERE
    ========================================== */}

    <div className="company-list">

      <h2>Companies</h2>
            {companies.length === 0 ? (

        <div className="empty-company">

          <h3>No Companies Found</h3>

          <p>
            Click "Add Company" to create your first company.
          </p>

        </div>

      ) : (

        <div className="company-table-wrapper">

          <table className="company-table">

            <thead>

              <tr>

                <th>No</th>

                <th>Hero Banner</th>

                <th>Logo</th>

                <th>Name</th>

                <th>Description</th>

                <th>Website</th>

                <th>Created</th>

                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {companies.map((company, index) => (

                <tr key={company.id}>

                  <td>{index + 1}</td>

                  <td>

                   <img
  src={company.heroImage || ""}
  alt="Hero"
  className="table-image"
/>
                  </td>

                  <td>

                   <img
  src={company.image || ""}
  alt={company.name}
  className="table-image"
/>

                  </td>

                  <td>{company.name}</td>

                  <td className="company-description">

                    {company.description.length > 60
                      ? company.description.substring(0, 60) + "..."
                      : company.description}

                  </td>

                  <td>

                    <a
                      href={company.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Visit
                    </a>

                  </td>

                  <td>

                    {company.createdAt
  ? new Date(company.createdAt).toLocaleDateString()
  : "-"}

                  </td>

                  <td>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteCompany(company.id)
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

</div>

);

};

export default Company;