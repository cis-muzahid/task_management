import React from "react";
import ProfileInfo from "../compenents/profileInfo";
import NavigationBar from "../compenents/NavBar";


function Settings(){
    return (
        <>
        <NavigationBar/>
        <div className="d-flex justify-content-center align-items-center vh-100">
                <ProfileInfo />
        </div>
        </>
    )
}

export default Settings;