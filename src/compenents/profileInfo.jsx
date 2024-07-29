import React from "react";
import UpdateAlertModal from "./alertForm";

function ProfileInfo({userdetail,showModal,handleShowModal,UpdateAlertTime, handleCloseModal}){

    return (
        <>
            <div className="col-lg-4">
                <div className="card mb-4">
                    <div className="card-body text-center">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                            className="rounded-circle img-fluid" style={{"width":100}} />
                        <h5 className="my-3">{userdetail.id}</h5>
                        <p className="text-muted mb-1">{userdetail.username}</p>
                        <p className="text-muted mb-4">{userdetail.email}</p>
                        <div className="text-muted mb-4">
                            <span>Default alert time - &nbsp;{userdetail.default_alert_time}&nbsp;min</span>
                            <button className="btn btn-sm btn-outline-primary ml-5" onClick={handleShowModal}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
            <UpdateAlertModal
                show={showModal}
                handleClose={handleCloseModal}
                handleUpdate={UpdateAlertTime}
                defaultAlertTime={userdetail.default_alert_time}
            />
        </>
    )
} 

export default ProfileInfo;