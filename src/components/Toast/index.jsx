// Toast.jsx
import React, { useEffect, useState } from "react";
import "./Toast.scss";

const Toast = ({ message, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // 3초 후에 fade-out 애니메이션 시작
        const closeTimer = setTimeout(() => {
            setIsVisible(false);
        }, 3000);

        return () => clearTimeout(closeTimer);
    }, []);

    useEffect(() => {
        // isVisible이 false로 바뀌면 fade-out 애니메이션 시작
        if (!isVisible) {
            const fadeOutTimer = setTimeout(() => {
                onClose(); // 애니메이션이 끝나고 토스트 숨기기
            }, 300); // fade-out 애니메이션의 지속 시간과 일치해야 함

            return () => clearTimeout(fadeOutTimer);
        }
    }, [isVisible, onClose]);

    return (
        <div className={`toast ${isVisible ? "fade-in" : "fade-out"}`}>
            <span>{message}</span>
        </div>
    );
};

export default Toast;
