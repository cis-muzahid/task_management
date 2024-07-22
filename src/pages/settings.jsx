import React, { useEffect, useState } from "react";
import ProfileInfo from "../compenents/profileInfo";
import NavigationBar from "../compenents/NavBar";
import { ChangePasswordAPI, CreateTaskTitleAPI, UpdateAlertTimeAPI, UserDetailAPI } from "../services/apiContext";
import CreateTaskTitle from "../compenents/createTaskTitle";
import UpdateAlertModal from "../compenents/alertForm";
import ChangePassword from "../compenents/changePassword";
import CreateTaskForm from "./createTaskForm";

function Settings() {
    const [userdetail, setUserdetail] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [showTitleModal, setShowTitleModal] = useState(false);
    const [showPasswordChangeModel, setShowPasswordChangeModel] = useState(false);

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
    const handleShowTitleModal = () => setShowTitleModal(true);
    const handleShowPasswordChangeModel = () => setShowPasswordChangeModel(true);


    const CloseModal = () => setShowModal(false);
    const CloseCreateModal = () => setShowTitleModal(false);
    const ClosePasswordChangeModel = () => setShowPasswordChangeModel(false);




    const handleCreateTaskTitle = async (title) => {
        try {
            const response = await CreateTaskTitleAPI(title)
            if (response.status === 201) {
                console.log('Task title list:', response.data);
            } else {
                console.error('Error:', response);
            }
        } catch (error) {
            console.error('Error:', error);
        }
        CloseCreateModal();
    }

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

    const handleChangePassowrd = async (data) => {
        console.log('Updating alert time:', data);

        try {
            const response = await ChangePasswordAPI(data)
            if (response.status === 200) {
                console.log('Task List:', response.data);
            } else {
                console.error('Error:', response);
            }
        } catch (error) {
            console.error('Error:', error);
        }
        ClosePasswordChangeModel();
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
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="col-lg-4">
                    <div className="card mb-4">
                        <div className="card-body text-center">
                            <div className="text-muted mb-4">
                                <button className="btn btn-sm btn-outline-primary ml-5" onClick={handleShowTitleModal}>Create Task Title</button>
                            </div>
                            <div className="text-muted mb-4">
                            <button className="btn btn-sm btn-outline-primary ml-5" onClick={handleShowPasswordChangeModel}>Change Passowrd</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <CreateTaskTitle
                show={showTitleModal}
                handleClose={CloseCreateModal}
                handleCreate={handleCreateTaskTitle}
                defaultAlertTime={userdetail.default_alert_time}
            />
            <ChangePassword
                show={showPasswordChangeModel}
                handleClose={ClosePasswordChangeModel}
                handleCreate={handleChangePassowrd}
            />
        </>
    )
}

export default Settings;