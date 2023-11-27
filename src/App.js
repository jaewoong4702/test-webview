import React, { useEffect, useState } from "react";

import "./App.scss";
import image1 from "./assets/images/image1.png";
import cliqq from "./assets/images/cliqq.png";
import refreshIcon from "./assets/images/ic-refresh.svg";
import useToast from "./hooks/useToast";
import Toast from "./components/Toast";
import ImageModal from "./components/ImageModal";
import Indicator from "./components/Indicator";

function App() {
    const { toast, showToast, hideToast } = useToast();
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
    const [log, setLog] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);

    const apiUrl = "https://api-dev.celebe.io";

    const apiCallbacks = {};

    // Android와 iOS에 메시지를 전송하는 함수
    function sendMessageToNativeApp(methodName, data) {
        const jsonString = JSON.stringify(data);
        setLog((prev) => prev + `\n sendMessage : ${jsonString}`);

        console.log(window.webkit);
        // Android와 통신
        if (window.Android) {
            window.Android[methodName](jsonString);
        }

        // iOS와 통신
        if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers[methodName]) {
            window.webkit.messageHandlers.sendApiRequest.postMessage(jsonString);
            // window.webkit.messageHandlers[methodName].postMessage(jsonString);
        }
    }

    // API 요청을 보내는 메서드
    function sendApiRequest(request) {
        const requestId = generateUniqueId();
        apiCallbacks[requestId] = request.callback; // 콜백 저장
        sendMessageToNativeApp("sendApiRequest", request);
    }

    function generateUniqueId() {
        // 현재 시간을 밀리초 단위로 가져와서 기본 값으로 사용합니다.
        const timestamp = Date.now();
        // 랜덤 값을 생성하여 추가적인 무작위성을 부여합니다.
        const randomPart = Math.random().toString(36).substring(2, 15);
        // 두 값을 결합하여 고유 ID를 생성합니다.
        return `${timestamp}-${randomPart}`;
    }

    // AppsFlyer 추적 코드 설정
    function setAppsflyerTrackingCode(data) {
        sendMessageToNativeApp("setAppsflyerTrackingCode", data);
    }

    // 버튼 클릭 핸들러
    function handleButtonClick() {
        // API 요청 예시
        sendApiRequest({
            method: "GET",
            url: "https://example.com/api",
            body: { key: "value" },
        });

        // setAppsflyerTrackingCode({ code: "YOUR_TRACKING_CODE" });
    }

    function handleRefreshClick() {
        // showToast("토스트팝업테스트");
        console.log("aa");
        // handleOpeningTimeClick();
        // setSuccessModalVisible(true);
        window.location.reload();
    }

    function handleOpeningTimeClick() {
        setLoading(true);
        setTimeout(() => {
            // setLoading(false);
        }, 2000);
    }
    function handleApiResponse(event) {
        setLog((prev) => prev + `\n handleApiResponse : ${event}`);
        console.log("event :", event);
        alert("event : ", event);
        const { requestId, data } = event.detail;

        // 해당 ID에 대한 콜백 함수가 있는지 확인하고 호출
        if (apiCallbacks[requestId]) {
            apiCallbacks[requestId](data);
            delete apiCallbacks[requestId]; // 호출 후 삭제
        }
    }
    useEffect(() => {
        window.addEventListener("nativeResponse", handleApiResponse);
        return () => {
            window.removeEventListener("nativeResponse", handleApiResponse);
        };
    }, []);

    useEffect(() => {
        setLog((prev) => prev + `\n sendApiRequest`);
        sendApiRequest({
            method: "GET",
            url: `${apiUrl}/auth/v1/points`,
        });
    }, []);

    return (
        <div className="event-page">
            <div className="event-header">
                <img src={image1} alt="image1" />
            </div>
            <div className="event-main">
                <div className="event-instructions">
                    <div className="event-check">
                        <div className="event-point-title">
                            <span>My CELEBe Point</span>
                        </div>
                        <div className="event-point">
                            <span className="event-point-login">Please log in and checkk</span>
                            {/* <span className="event-point-value">123P</span> */}
                        </div>
                    </div>
                    <div className="event-opening-time">
                        <button>{isLoading ? <Indicator /> : "Opens at 8 PM"}</button>
                    </div>
                    <div className="event-redemption">
                        <p>After the exchange.</p>
                        <p>a redemption code is sent to the DM.</p>
                        <p>You can redeem the code on CLIQQ Wallet.</p>
                        <p>{log}</p>
                    </div>
                </div>
            </div>
            <div className="event-footer">
                <div className="notes">
                    <p className="notes-title">Notes</p>
                    <ul>
                        <li>- Each user can participate only once per day.</li>
                        <li>- Only public account can participate this event. </li>
                        <li>- Cancellation is not possible after the exchange.</li>
                        <li>- Participation may be denied if you participate in an illegal way.</li>
                        <li> - This event may be closed at any time, subject to our circumstances.</li>
                        <li>- Please refer to CLiQQ Wallet for detailed information on how to redeem the code.</li>
                        <li>- Inquiry: CELEBe Q&A</li>
                    </ul>
                </div>
            </div>
            <div className="refresh-button-container">
                <button onClick={handleRefreshClick}>
                    <img src={refreshIcon} alt="refresh" />
                </button>
            </div>
            {toast.isVisible && <Toast message={toast.message} onClose={hideToast} />}
            {isSuccessModalVisible && (
                <ImageModal
                    image={cliqq}
                    title="The exchange was successful"
                    content={
                        <div>
                            <p>You can only exchange once a day.</p>
                            <p>
                                The exchange voucher will be sent shortly via <span>CELEBe direct message.</span>
                            </p>
                            <p className="explain">* This voucher is exclusive to the Philippines.</p>
                        </div>
                    }
                    buttonText="OK"
                    onClose={() => setSuccessModalVisible(false)}
                />
            )}
        </div>
    );
}

export default App;
