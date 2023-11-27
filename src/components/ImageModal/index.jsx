import React from "react";
import "./ImageModal.scss"; // 모달에 대한 스타일

const Modal = ({ image, title, content, buttonText, onClose }) => {
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {image && (
                    <div className="modal-image-container">
                        <img src={image} alt="Modal banner" />
                    </div>
                )}
                {title && <div className="modal-title">{title}</div>}
                <div className="modal-body">{content}</div>
                <div className="modal-footer">
                    <button onClick={onClose}>{buttonText}</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
