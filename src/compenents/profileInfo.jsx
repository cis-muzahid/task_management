import React from "react";

function ProfileInfo(){
    return (
        <>
            <div class="col-lg-4">
                <div class="card mb-4">
                    <div class="card-body text-center">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                            class="rounded-circle img-fluid" style={{"width":100}} />
                        <h5 class="my-3">John Smith</h5>
                        <p class="text-muted mb-1">Full Stack Developer</p>
                        <p class="text-muted mb-4">Bay Area, San Francisco, CA</p>
                    </div>
                </div>
            </div>
        </>
    )
} 

export default ProfileInfo;