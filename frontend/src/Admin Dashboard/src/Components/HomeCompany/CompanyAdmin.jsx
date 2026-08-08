import React, { useState, useEffect } from "react";
import "./CompanyAdmin.css";

 const API_URL =
  "https://a9vqiga5na.execute-api.ap-south-1.amazonaws.com/prod/companies";

const CompanyAdmin = () => {
  /* ===========================
      STATES
  ============================ */

  const [companies, setCompanies] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    companyName: "",
    companyDescription: "",
    image: "",
  });
const [selectedFile, setSelectedFile] = useState(null);
 const [editingCompany, setEditingCompany] = useState(null);
const [oldKey, setOldKey] = useState("");

const loadCompanies = async () => {
  try {

    const response = await fetch(API_URL);

    if (!response.ok) {
  throw new Error("Failed to load companies");
}

const data = await response.json();

setCompanies(Array.isArray(data) ? data : []);

  } catch (err) {

    console.log(err);

  }
};

useEffect(() => {
  loadCompanies();
}, []);

  /* ===========================
      INPUT CHANGE
  ============================ */

  const handleInput = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ===========================
      IMAGE UPLOAD
  ============================ */

  const handleImage = (file) => {

  if (!file) return;

  setSelectedFile(file);

  setForm((prev) => ({
    ...prev,
    image: URL.createObjectURL(file),
  }));

};

  /* ===========================
      RESET FORM
  ============================ */

   const resetForm = () => {

  setEditingCompany(null);

  setOldKey("");

  setSelectedFile(null);

  setForm({
    companyName: "",
    companyDescription: "",
    image: "",
  });

};
  /* ===========================
    CANCEL FORM
=========================== */
const cancelForm = () => {

  resetForm();

  setEditingCompany(null);

  setShowForm(false);

};

  /* ===========================
      SAVE COMPANY
  ============================ */

   const saveCompany = async () => {

  if (!form.companyName.trim()) {
    alert("Please enter company name.");
    return;
  }

  try {

    let imageUrl = form.image;
    let key = oldKey;

    /* ===========================
       Upload New Image (Optional)
    ============================ */

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

    /* ===========================
       UPDATE COMPANY
    ============================ */

    if (editingCompany) {

      const update = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingCompany.id,
          companyName: form.companyName,
          companyDescription: form.companyDescription,
          image: imageUrl,
          key,
          oldKey,
        }),
      });

      if (!update.ok) {
        throw new Error("Update failed");
      }

      alert("Company Updated");

    }

    /* ===========================
       ADD COMPANY
    ============================ */

    else {

      if (!selectedFile) {
        alert("Please select image.");
        return;
      }

      const save = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName: form.companyName,
          companyDescription: form.companyDescription,
          image: imageUrl,
          key,
        }),
      });

      if (!save.ok) {
        throw new Error("Save failed");
      }

      alert("Company Added");
    }

    resetForm();

    setShowForm(false);

    loadCompanies();

  } catch (err) {

    console.log(err);

    alert("Operation Failed");

  }

};

const editCompany = (company) => {

  setEditingCompany(company);

  setOldKey(company.key);

  setSelectedFile(null);

  setForm({
    companyName: company.companyName,
    companyDescription: company.companyDescription,
    image: company.image,
  });

  setShowForm(true);

};
  /* ===========================
      DELETE COMPANY
  ============================ */

  const deleteCompany = async (id) => {

  if (!window.confirm("Delete this company?")) return;

  console.log("Deleting ID:", id);

  try {

    const response = await fetch(API_URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });

    console.log("Status:", response.status);

    const data = await response.json();

    console.log("Response:", data);

    if (!response.ok) {
      alert(data.message);
      return;
    }

    alert("Deleted Successfully");

    await loadCompanies();

  } catch (err) {

    console.error(err);

  }

};

  return (
    <div className="companyAdmin">

      <h2>Our Companies</h2>

<button
  className="addCompanyBtn"
  onClick={() => {
    resetForm();
    setEditingCompany(null);
    setShowForm(true);
  }}
>
  + Add Our Company
</button>

{showForm && (

      <div className="companyForm">

        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={form.companyName}
          onChange={handleInput}
        />

        <textarea
          rows={5}
          name="companyDescription"
          placeholder="Company Description"
          value={form.companyDescription}
          onChange={handleInput}
        />

        <h3>
  {editingCompany
    ? "Replace Company Image (Optional)"
    : "Company Image"}
</h3>

        <input
  type="file"
  accept="image/*"
  onChange={(e) =>
    handleImage(e.target.files[0])
  }
/>

{editingCompany && (
  <p
    style={{
      marginTop: "8px",
      color: "#777",
      fontSize: "13px",
    }}
  >
    Leave empty if you don't want to replace the image.
  </p>
)}
       {form.image && (

  <div className="previewWrapper">

    <img
      src={form.image}
      alt="Preview"
      className="preview"
    />

  </div>

)}

       

      <div className="buttonGroup">

<button
  className="saveBtn"
  onClick={saveCompany}
>
  {editingCompany
    ? "Save Changes"
    : "Save Company"}
</button>

<button
  className="cancelBtn"
  onClick={cancelForm}
>
  Cancel
</button>

</div>

</div>

)}
            {/* ===========================
          SAVED COMPANIES
      =========================== */}

      <div className="companyList">

  <h2>Saved Companies</h2>

  {companies.length === 0 ? (
    <p className="noData">No companies added.</p>
  ) : (

    <table className="companyTable">

      <thead>
        <tr>
          <th>No</th>
          <th>Image</th>
          <th>Company Name</th>
          <th>Description</th>
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
                src={company.image}
                alt={company.companyName}
                className="tableImage"
              />
            </td>

            <td>{company.companyName}</td>

            <td>{company.companyDescription}</td>

            <td>{company.created}</td>

            <td>

  <button
    className="editBtn"
    onClick={() => editCompany(company)}
  >
    Edit
  </button>

  <button
    className="deleteBtn"
    onClick={() => deleteCompany(company.id)}
  >
    Delete
  </button>

</td>
            
          </tr>

        ))}

      </tbody>

    </table>

  )}

</div>

              

            

    </div>
  );
};

export default CompanyAdmin;