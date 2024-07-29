import React, { useEffect, useState } from "react";
import ProfileInfo from "../compenents/profileInfo";
import NavigationBar from "../compenents/NavBar";
import { ChangePasswordAPI, CreateTaskTitleAPI, UpdateAlertTimeAPI, UserDetailAPI } from "../services/apiContext";
import CreateTaskTitle from "../compenents/createTaskTitle";
import ChangePassword from "../compenents/changePassword";
import AlertModel from "../compenents/alertModel";

function Settings() {
    const [userdetail, setUserdetail] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [showTitleModal, setShowTitleModal] = useState(false);
    const [showPasswordChangeModel, setShowPasswordChangeModel] = useState(false);
    const [title, setTitle] = useState({ name: '' });
    const [titleError, setTitleError] = useState('');
    const [titleSuccess, setTitleSuccess] = useState('');

    const [passowrdError, setPassowrdError] = useState('');
    const [passowrdSuccess, setPassowrdSuccess] = useState('');



    const [showMessageModal, setShowMessageModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    useEffect(() => {
        const FetchUserDetail = async () => {
            try {
                const response = await UserDetailAPI();
                if (response.status === 200) {
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
    const CloseCreateModal = () => {
        setShowTitleModal(false)
        setTitle({ ...title, name: '' })
        setTitleError('')
    };
    const ClosePasswordChangeModel = () => setShowPasswordChangeModel(false);




    const handleCreateTaskTitle = async (title) => {
        try {
            const response = await CreateTaskTitleAPI(title)
            if (response.status === 201) {
                setTitle({ ...title, name: '' })    
                setTitleSuccess('Title created successfully')
            } else {
                console.error('Error:', response);
                setTitleError(response.data.name[0])
            }
        } catch (error) {
            if (error.response) {
                if(error.response.data.name){
                    console.error("title create failed:", error.response.data);
                    setTitleError(error.response.data.name[0]||'getting some issue try again')
                }
                if(error.response.data.non_field_errors){
                    console.error("title create failed:", error.response.data);
                    setTitleError(error.response.data.non_field_errors[0]||'getting some issue try again')
                }
            } else {
                console.error("title create failed:", error.message);
                setTitleError(error.response.data.name[0]||'getting some issues try again')
            }
        }
        // CloseCreateModal();
    }

    const handleUpdateAlertTime = async (newAlertTime) => {

        try {
            const response = await UpdateAlertTimeAPI(newAlertTime)
            if (response.status === 200) {
                setUserdetail(prevUserDetail => ({
                    ...prevUserDetail,
                    ...response.data
                }));
            } else {
                console.error('Error:', response);
            }
        } catch (error) {
            if (error.response) {
                console.error("alert time:", error.response.data);
            } else {
                console.error("alert time:", error.message);
            }
        }
        CloseModal();
    };

    const handleChangePassowrd = async (data) => {

        try {
            const response = await ChangePasswordAPI(data)
            if (response.status === 200) {
                setPassowrdSuccess('Password changed successfully')
            }else {
                console.error('Error:', response);
                setPassowrdError(response.data.new_password[0]||'getting some issue try again')
            }
        } catch (error) {
            if (error.response) {
                console.error("password change failed:", error.response.data);
                if(error.response.data.new_password){
                    setPassowrdError(error.response.data.new_password[0]||'getting some issue try again')
                }
                else if(error.response.data.current_password){
                    setPassowrdError(error.response.data.current_password||'getting some issue try again')
                }
            } else {
                console.error("password change  failed:", error.message);
                setTitleError(error.response.data.new_password[0]||'getting some issues try again')
            }
        }
    };



    const handleCloseMessageModal = () => {
        setShowMessageModal(false);
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
                title={title}
                setTitle={setTitle}
                titleError={titleError}
                titleSuccess={titleSuccess}
                handleClose={CloseCreateModal}
                handleCreate={handleCreateTaskTitle}
                defaultAlertTime={userdetail.default_alert_time}
            />
            <ChangePassword
                show={showPasswordChangeModel}
                passowrdError={passowrdError}
                setPassowrdError={setPassowrdError}
                passowrdSuccess={passowrdSuccess}
                handleClose={ClosePasswordChangeModel}
                handleCreate={handleChangePassowrd}
            />

            <AlertModel
                handleCloseModal={handleCloseMessageModal}
                showModal={showMessageModal}
                modalMessage={modalMessage}
            />
        </>
    )
}

export default Settings;