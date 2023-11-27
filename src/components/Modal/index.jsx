import React from "react";
import "./Modal.scss"; // 모달에 대한 스타일

const Modal = ({ title, content, buttons, onClose }) => {
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {title && <div className="modal-title">{title}</div>}
                <div className="modal-body">{content}</div>
                <div className="modal-footer">
                    {buttons.map((button, index) => (
                        <button key={index} onClick={button.onClick}>
                            {button.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Modal;
