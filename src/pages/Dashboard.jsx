import React from "react"
import NavigationBar from "../compenents/NavBar";
import TaskCreate from "../compenents/taskCreate";

function Dashboard(){
    return (
      <>     
       <NavigationBar />
      <TaskCreate/>
      </>

    )
}

export default Dashboard;