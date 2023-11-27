// import { useState, useCallback } from "react";

// const useToast = () => {
//     const [isToastVisible, setToastVisible] = useState(false);
//     const [message, setMessage] = useState("");

//     const showToast = useCallback((msg) => {
//         setMessage(msg);
//         setToastVisible(true);
//         setTimeout(() => {
//             setToastVisible(false);
//         }, 3000); // 3초 후 토스트 팝업을 숨김
//     }, []);

//     const hideToast = useCallback(() => {
//         setToastVisible(false);
//     }, []);

//     return {
//         isToastVisible,
//         message,
//         showToast,
//         hideToast,
//     };
// };

// export default useToast;

import { useState, useCallback } from "react";

const useToast = () => {
    const [toast, setToast] = useState({ isVisible: false, message: "" });

    const showToast = useCallback((message) => {
        setToast({ isVisible: true, message });
    }, []);

    const hideToast = useCallback(() => {
        // 애니메이션 시작 전 상태를 업데이트
        setToast((prev) => ({ ...prev, isVisible: false }));
    }, []);

    return {
        toast,
        showToast,
        hideToast,
    };
};

export default useToast;
