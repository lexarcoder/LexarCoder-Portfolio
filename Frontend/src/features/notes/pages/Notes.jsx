// import React, { useState, useEffect, useRef } from "react";
// import { FaEye, FaDownload } from "react-icons/fa";
// import ReactDOM from "react-dom";
// import { notesData } from "../data/NotesData";
// import "../style/Notes.scss";

// // Reusable Modal Component using React Portals
// const PreviewModal = ({ note, onClose }) => {
//   const modalOverlayRef = useRef(null);
//   const closeButtonRef = useRef(null);

//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.key === "Escape") onClose();
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     document.body.style.overflow = "hidden";

//     if (closeButtonRef.current) {
//       closeButtonRef.current.focus();
//     }

//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//       document.body.style.overflow = "unset";
//     };
//   }, [onClose]);

//   const handleOutsideClick = (event) => {
//     if (modalOverlayRef.current === event.target) {
//       onClose();
//     }
//   };

//   // Safe transformation logic for Google Drive preview links
//   const getEmbedUrl = (url) => {
//     if (!url) return "";
//     if (url.includes("/uc?export=download&")) {
//       return `${url.replace("/uc?export=download&", "/file/d/")}/preview?embedded=true`;
//     }
//     return url;
//   };

//   return ReactDOM.createPortal(
//     <div
//       className="modal-overlay"
//       ref={modalOverlayRef}
//       onClick={handleOutsideClick}
//       role="dialog"
//       aria-modal="true"
//       aria-labelledby="modal-heading-title"
//     >
//       <div className="modal-content-window">
//         <header className="modal-content-header">
//           <div className="modal-header-branding">
//             {note.logoUrl ? (
//               <img src={note.logoUrl} alt="" className="modal-branding-logo" />
//             ) : (
//               <div className="modal-branding-logo-fallback">LC</div>
//             )}
//             <h2 id="modal-heading-title">{note.title}</h2>
//           </div>
//           <button
//             className="btn-close-modal"
//             ref={closeButtonRef}
//             onClick={onClose}
//             aria-label="Close modal dialog"
//           >
//             &times;
//           </button>
//         </header>

//         <div className="modal-body-iframe-wrapper">
//           <iframe
//             src={getEmbedUrl(note.pdfUrl)}
//             title={`${note.title} Document Viewer`}
//             className="pdf-iframe-element"
//             loading="lazy"
//           >
//             <p>
//               Your browser cannot display this document inline.{" "}
//               <a href={note.pdfUrl} target="_blank" rel="noopener noreferrer">
//                 Click here to open the file directly.
//               </a>
//             </p>
//            </iframe>
//         </div>
//       </div>
//     </div>,
//     document.body
//   );
// };

// const Notes = () => {
//   const [activePreviewNote, setActivePreviewNote] = useState(null);

//   const handleDownload = (pdfUrl, title) => {
//     const link = document.createElement("a");
//     link.href = pdfUrl;
//     link.download = `${title.trim().replace(/\s+/g, "_")}_Notes`;
//     link.target = "_blank";
//     link.rel = "noopener noreferrer";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div className="notes-library-page">
//       <main className="notes-grid-container">
//         {notesData.map((note) => (
//           <article key={note.id} className="note-card">
//             <div className="card-image-wrapper">
//               {note.logoUrl ? (
//                 <img
//                   src={note.logoUrl}
//                   alt={`${note.title} reference banner`}
//                   className="course-logo"
//                   loading="lazy"
//                 />
//               ) : (
//                 <div className="course-logo-fallback">
//                   <span>{note.title.charAt(0)}</span>
//                 </div>
//               )}
//             </div>

//             <div className="card-content">
//               <h2 className="course-title">{note.title}</h2>
//               <p className="course-description">{note.description}</p>
//             </div>

//             <div className="card-actions">
//               <button
//                 className="btn btn-preview"
//                 onClick={() => setActivePreviewNote(note)}
//                 aria-label={`Preview ${note.title} notes in viewer`}
//               >
//                 <FaEye className="btn-icon" />
//                 <span>Preview</span>
//               </button>

//               <button
//                 className="btn btn-premium  " 
//                 onClick={() => handleDownload(note.pdfUrl, note.title)}
//                 aria-label={`Download ${note.title} notes PDF directly`}
//               >
//                 <FaDownload className="btn-icon" />
//                 <span>Download</span>
//               </button>
//             </div>
//           </article>
//         ))}
//       </main>

//       {activePreviewNote && (
//         <PreviewModal
//           note={activePreviewNote}
//           onClose={() => setActivePreviewNote(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default Notes;

import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { FaDownload, FaEye } from "react-icons/fa";

import { notesData } from "../data/NotesData";
import "../style/Notes.scss";


// Preview Modal
const PreviewModal = ({ note, onClose }) => {
  const overlayRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleOutsideClick = (event) => {
    if (event.target === overlayRef.current) {
      onClose();
    }
  };

  const getPreviewUrl = (url) => {
    if (!url) return "";

    if (url.includes("/uc?export=download&")) {
      return `${url.replace(
        "/uc?export=download&",
        "/file/d/"
      )}/preview?embedded=true`;
    }

    return url;
  };

  return ReactDOM.createPortal(
    <div
      className="modal-overlay"
      ref={overlayRef}
      onClick={handleOutsideClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-heading-title"
    >
      <div className="modal-content-window">
        <header className="modal-content-header">
          <div className="modal-header-branding">
            {note.logoUrl ? (
              <img
                src={note.logoUrl}
                alt=""
                className="modal-branding-logo"
              />
            ) : (
              <div className="modal-branding-logo-fallback">
                LC
              </div>
            )}

            <h2 id="modal-heading-title">
              {note.title}
            </h2>
          </div>

          <button
            className="btn-close-modal"
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </header>

        <div className="modal-body-iframe-wrapper">
          <iframe
            src={getPreviewUrl(note.pdfUrl)}
            title={`${note.title} Document Viewer`}
            className="pdf-iframe-element"
            loading="lazy"
          />
        </div>
      </div>
    </div>,
    document.body
  );
};


// Note Card
const NoteCard = ({ note, onPreview, onDownload }) => {
  return (
    <article className="note-card page">
      <div className="card-image-wrapper">
        {note.logoUrl ? (
          <img
            src={note.logoUrl}
            alt={`${note.title} reference banner`}
            className="course-logo"
            loading="lazy"
          />
        ) : (
          <div className="course-logo-fallback">
            <span>{note.title.charAt(0)}</span>
          </div>
        )}
      </div>

      <div className="card-content">
        <h2 className="course-title">{note.title}</h2>

        <p className="course-description">{note.description}</p>
      </div>

      <div className="card-actions">
        <button
          className="btn btn-preview"
          onClick={() => onPreview(note)}
          aria-label={`Preview ${note.title} notes`}
        >
          <FaEye className="btn-icon" />
          <span>Preview</span>
        </button>

        <button
          className="btn  btn-premium"
          onClick={() => onDownload(note.pdfUrl, note.title)}
          aria-label={`Download ${note.title} notes`}
        >
          <FaDownload className="btn-icon" />
          <span>Download</span>
        </button>
      </div>
    </article>
  );
};


// Notes Page
const Notes = () => {
  const [activePreviewNote, setActivePreviewNote] = useState(null);

  const handleDownload = (pdfUrl, title) => {
    const fileName = `${title.trim().replace(/\s+/g, "_")}_Notes`;

    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = fileName;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="notes-library-page">
      <main className="notes-grid-container">
        {notesData.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onPreview={setActivePreviewNote}
            onDownload={handleDownload}
          />
        ))}
      </main>

      {activePreviewNote && (
        <PreviewModal
          note={activePreviewNote}
          onClose={() => setActivePreviewNote(null)}
        />
      )}
    </div>
  );
};

export default Notes;
