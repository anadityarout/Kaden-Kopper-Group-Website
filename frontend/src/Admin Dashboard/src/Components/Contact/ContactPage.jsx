import React, { useState, useEffect, useRef } from "react";
import "./ContactPage.css";

const STORAGE_KEY = "contact_page_data";

const ContactPage = () => {
  const [contacts, setContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [addressImage, setAddressImage] = useState("");
  const [messageImage, setMessageImage] = useState("");

  const addressInputRef = useRef(null);
  const messageInputRef = useRef(null);

  // ==========================
  // Load Data
  // ==========================
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setContacts(saved);
  }, []);

  // ==========================
  // Save Data
  // ==========================
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  // ==========================
  // Convert Image
  // ==========================
  const convertImage = (file, callback) => {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      callback(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  // ==========================
  // Upload Address Image
  // ==========================
  const handleAddressUpload = (e) => {
    const file = e.target.files[0];

    convertImage(file, (image) => {
      setAddressImage(image);
    });

    e.target.value = "";
  };

  // ==========================
  // Upload Message Image
  // ==========================
  const handleMessageUpload = (e) => {
    const file = e.target.files[0];

    convertImage(file, (image) => {
      setMessageImage(image);
    });

    e.target.value = "";
  };

  // ==========================
  // Open Add Modal
  // ==========================
  const openAddModal = () => {
    setEditingIndex(null);
    setAddressImage("");
    setMessageImage("");
    setShowModal(true);
  };

  // ==========================
  // Close Modal
  // ==========================
  const closeModal = () => {
    setShowModal(false);
    setEditingIndex(null);
    setAddressImage("");
    setMessageImage("");
  };
    // ==========================
  // Save Contact
  // ==========================
  const handleSave = () => {
    if (!addressImage || !messageImage) {
      alert("Please upload both Address Image and Message Image.");
      return;
    }

    const data = {
      id: Date.now(),
      addressImage,
      messageImage,
      created: new Date().toLocaleDateString(),
    };

    if (editingIndex !== null) {
      const updated = [...contacts];

      updated[editingIndex] = {
        ...updated[editingIndex],
        addressImage,
        messageImage,
      };

      setContacts(updated);
    } else {
      setContacts([...contacts, data]);
    }

    closeModal();
  };

  // ==========================
  // Edit Contact
  // ==========================
  const handleEdit = (index) => {
    setEditingIndex(index);

    setAddressImage(contacts[index].addressImage);
    setMessageImage(contacts[index].messageImage);

    setShowModal(true);
  };

  // ==========================
  // Delete Contact
  // ==========================
  const handleDelete = (index) => {
    if (!window.confirm("Delete this contact image?")) return;

    const updated = [...contacts];
    updated.splice(index, 1);

    setContacts(updated);
  };

  return (
    <div className="contact-admin">

      {/* ================= Header ================= */}

      <div className="page-header">
        <h1>Contact Page</h1>

        <button
          className="add-btn"
          onClick={openAddModal}
        >
          + Add Contact
        </button>
      </div>

      {/* ================= Table ================= */}

      <div className="table-wrapper">

        <table className="contact-table">

          <thead>

            <tr>
              <th>No</th>
              <th>Address Slider</th>
              <th>Message Image</th>
              <th>Created</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {contacts.length === 0 ? (

              <tr>

                <td colSpan="5" className="empty-row">
                  No Contact Images Found
                </td>

              </tr>

            ) : (

              contacts.map((item, index) => (

                <tr key={item.id}>

                  <td>{index + 1}</td>

                  <td>

                    <img
                      src={item.addressImage}
                      alt=""
                      className="table-image"
                    />

                  </td>

                  <td>

                    <img
                      src={item.messageImage}
                      alt=""
                      className="table-image"
                    />

                  </td>

                  <td>{item.created}</td>

                  <td>

                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(index)}
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
            {/* ================= Modal ================= */}

      {showModal && (
        <div className="modal-overlay">

          <div className="contact-modal">

            <div className="modal-header">
              <h2>
                {editingIndex !== null
                  ? "Edit Contact Images"
                  : "Add Contact Images"}
              </h2>

              <button
                className="close-btn"
                onClick={closeModal}
              >
                ×
              </button>
            </div>

            {/* Address Image */}

            <div className="upload-box">

              <h3>Address Slider Image</h3>

              {addressImage ? (
                <img
                  src={addressImage}
                  alt=""
                  className="preview-image"
                />
              ) : (
                <div className="preview-placeholder">
                  No Image Selected
                </div>
              )}

              <button
                className="upload-btn"
                onClick={() => addressInputRef.current.click()}
              >
                Upload Address Image
              </button>

              <input
                ref={addressInputRef}
                type="file"
                hidden
                accept="image/*"
                onChange={handleAddressUpload}
              />

            </div>

            {/* Message Image */}

            <div className="upload-box">

              <h3>Message Image</h3>

              {messageImage ? (
                <img
                  src={messageImage}
                  alt=""
                  className="preview-image"
                />
              ) : (
                <div className="preview-placeholder">
                  No Image Selected
                </div>
              )}

              <button
                className="upload-btn"
                onClick={() => messageInputRef.current.click()}
              >
                Upload Message Image
              </button>

              <input
                ref={messageInputRef}
                type="file"
                hidden
                accept="image/*"
                onChange={handleMessageUpload}
              />

            </div>

            {/* Footer */}

            <div className="modal-footer">

              <button
                className="cancel-btn"
                onClick={closeModal}
              >
                Cancel
              </button>

              <button
                className="save-btn"
                onClick={handleSave}
              >
                {editingIndex !== null ? "Update" : "Save"}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default ContactPage;