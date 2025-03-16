import Modal from "react-modal";
import "./GoogleDocModal.css"; // Add this new CSS file

const GoogleDocModal = ({ isModalOpen, setIsModalOpen, docId }) => {
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      className="custom-modal-content"
      overlayClassName="custom-modal-overlay"
    >
      {/* Close Button */}
      <button className="custom-close-btn" onClick={() => setIsModalOpen(false)}>
        ✖
      </button>

      {/* Google Doc Viewer */}
      <iframe
        src={`https://docs.google.com/document/d/${docId}/preview`}
        className="google-doc-frame"
        title="Full Google Doc"
      ></iframe>
    </Modal>
  );
};

export default GoogleDocModal;
