import React, { useEffect, useState } from "react";
import ProfileInfo from "../compenents/profileInfo";
import NavigationBar from "../compenents/NavBar";
import { UpdateAlertTimeAPI, UserDetailAPI } from "../services/apiContext";


function Settings() {
    const [userdetail, setUserdetail] = useState({});
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        const FetchUserDetail = async () => {
            try {
                const response = await UserDetailAPI();
                if (response.status === 200) {
                    console.log('user detail:', response.data);
                    setUserdetail(response.data);
                } else {
                    console.error('Error:', response);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        FetchUserDetail();
    }, []);

    const handleShowModal = () => setShowModal(true);

    const CloseModal = () => setShowModal(false);

    const handleUpdateAlertTime = async (newAlertTime) => {
        console.log('Updating alert time:', newAlertTime);

        try {
            const response = await UpdateAlertTimeAPI(newAlertTime)
            if (response.status === 200) {
                console.log('Task List:', response.data);
                setUserdetail(prevUserDetail => ({
                    ...prevUserDetail,
                    ...response.data   
                }));
            } else {
                console.error('Error:', response);
            }
        } catch (error) {
            console.error('Error:', error);
        }
        CloseModal();
    };

    return (
        <>
            <NavigationBar />
            <div className="d-flex justify-content-center align-items-center vh-100">
                <ProfileInfo
                    userdetail={userdetail}
                    UpdateAlertTime={handleUpdateAlertTime}
                    handleShowModal={handleShowModal}
                    handleCloseModal={CloseModal}
                    showModal={showModal} />
            </div>
        </>
    )
}

export default Settings;