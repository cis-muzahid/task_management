import React, { useEffect, useState } from "react";
import ProfileInfo from "../compenents/profileInfo";
import NavigationBar from "../compenents/NavBar";
import {
  ChangePasswordAPI,
  CreateTaskTitleAPI,
  GetTaskTitleList,
  SetDefaultTitleAPI,
  TitleDeleteAPI,
  TitleUpdateAPI,
  UpdateAlertTimeAPI,
  UserDetailAPI,
} from "../services/apiContext";
import CreateTaskTitle from "../compenents/createTaskTitle";
import ChangePassword from "../compenents/changePassword";
import AlertModel from "../compenents/alertModel";
import UpdateTaskTitleModal from "../compenents/updateTaskTitle";
import SettingTaskTable from "../compenents/SettingTaskTable";
import { CreateQueryString } from "../utils/utitlity";

function Settings() {
  const [userdetail, setUserdetail] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showTitleModal, setShowTitleModal] = useState(false);
  const [showPasswordChangeModel, setShowPasswordChangeModel] = useState(false);

  const [title, setTitle] = useState({ name: "" });
  const [titleError, setTitleError] = useState("");
  const [titleSuccess, setTitleSuccess] = useState("");

  const [passowrdError, setPassowrdError] = useState("");
  const [passowrdSuccess, setPassowrdSuccess] = useState("");

  const [showTitleUpdateModal, setShowTitleUpdateModal] = useState(false);
  const [titleToUpdate, setTitleToUpdate] = useState(null);

  const [showMessageModal, setShowMessageModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [titles, setTitles] = useState([]);
  const [filter, setFilter] = useState({ search: "" });

  useEffect(() => {
    const FetchUserDetail = async () => {
      try {
        const response = await UserDetailAPI();
        if (response.status === 200) {
          setUserdetail(response.data);
        } else {
          console.error("Error:", response);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    FetchUserDetail();
    FetchTitles();
  }, []);

  const FetchTitles = async () => {
    try {
      const response = await GetTaskTitleList();
      if (response.status === 200) {
        setTitles(response.data);
      } else {
        console.error("Error:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleShowTitleModal = () => setShowTitleModal(true);
  const handleShowPasswordChangeModel = () => setShowPasswordChangeModel(true);

  const CloseModal = () => setShowModal(false);
  const CloseCreateModal = () => {
    setShowTitleModal(false);
    setTitle({ ...title, name: "" });
    setTitleError("");
  };

  const ClosePasswordChangeModel = () => setShowPasswordChangeModel(false);

  const handleCreateTaskTitle = async (title) => {
    try {
      const response = await CreateTaskTitleAPI(title);
      if (response.status === 201) {
        setTitle({ ...title, name: "" });
        const updatedTitles = [...titles, response.data];
        setTitles(updatedTitles);
        setTitleSuccess("Task Type created successfully");
        
        // const timer = setTimeout(() => {
        //     console.log("timmmmerrr")
        //   }, 100);
        // clearTimeout(timer);  
      } else {
        console.error("Error:", response);
        setTitleError(response.data.name[0]);
      }
      HandleTitleModelClose()
    } catch (error) {
      if (error.response) {
        if (error.response.data.name) {
          console.error("title create failed:", error.response.data);
          setTitleError(
            error.response.data.name[0] || "getting some issue try again"
          );
        }
        if (error.response.data.non_field_errors) {
          console.error("title create failed:", error.response.data);
          setTitleError(
            error.response.data.non_field_errors[0] ||
              "getting some issue try again"
          );
        }
      } else {
        console.error("title create failed:", error.message);
        setTitleError(
          error.response.data.name[0] || "getting some issues try again"
        );
      }
    }
  };

  const handleUpdateAlertTime = async (newAlertTime) => {
    try {
      const response = await UpdateAlertTimeAPI(newAlertTime);
      if (response.status === 200) {
        setUserdetail((prevUserDetail) => ({
          ...prevUserDetail,
          ...response.data,
        }));
      } else {
        console.error("Error:", response);
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
      const response = await ChangePasswordAPI(data);
      if (response.status === 200) {
        setPassowrdSuccess("Password changed successfully");
      } else {
        console.error("Error:", response);
        setPassowrdError(
          response.data.new_password[0] || "getting some issue try again"
        );
      }
    } catch (error) {
      if (error.response) {
        console.error("password change failed:", error.response.data);
        if (error.response.data.new_password) {
          setPassowrdError(
            error.response.data.new_password[0] ||
              "getting some issue try again"
          );
        } else if (error.response.data.current_password) {
          setPassowrdError(
            error.response.data.current_password ||
              "getting some issue try again"
          );
        }
      } else {
        console.error("password change  failed:", error.message);
        setTitleError(
          error.response.data.new_password[0] || "getting some issues try again"
        );
      }
    }
  };

  const handleFilterChange = async (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filter };
    newFilters[name] = value;
    const queryString = CreateQueryString(newFilters);
    try {
      const response = await GetTaskTitleList(queryString);
      if (response.status === 200) {
        setTitles(response.data);
      } else {
        console.error("Error:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setFilter(newFilters);
  };

  const deleteTitle = async (id) => {
    try {
      const response = await TitleDeleteAPI(id);
      if (response.status === 204) {
        const updatedTitles = titles.filter((t) => t.id !== id);
        setTitles(updatedTitles);
        setModalMessage("Task Deleted Successfully");
        setShowMessageModal(true);
      } else {
        console.error("Error:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const HandleTitleUpdateShowModel = (data) => {
    setTitleToUpdate(data);
    setShowTitleUpdateModal(true);
  };

  const HandleTitleModelClose = () => {
    setShowTitleUpdateModal(false);
  };

  const HandleTitleUpdate = async (updatedTitle) => {
    console.log("updated");
    try {
      const response = await TitleUpdateAPI(updatedTitle);
      if (response.status === 200) {
        console.log(response.data);
        setTitles((prevTitles) =>
          prevTitles.map((title) =>
            title.id === updatedTitle.id
              ? { ...title, ...response.data }
              : title
          )
        );
        setTitleToUpdate(null);
      }
      // CloseShowTaskUpdateModal();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleCloseMessageModal = () => {
    setShowMessageModal(false);
  };

  const HandleSetDefaultTitle = async (id) => {
    try {
      const response = await SetDefaultTitleAPI(id);
      if (response.status === 200) {
        console.log(response.data);
        setModalMessage("Default title has been set successfully!");
        setShowMessageModal();
        setTitles(response.data);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
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
          showModal={showModal}
        />
      </div>

      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-body text-center">
              <div className="text-muted mb-4">
                <button
                  className="btn btn-sm btn-outline-primary ml-5"
                  onClick={handleShowTitleModal}
                >
                  Create Task Type
                </button>
              </div>
              <div className="text-muted mb-4">
                <button
                  className="btn btn-sm btn-outline-primary ml-5"
                  onClick={handleShowPasswordChangeModel}
                >
                  Change Passowrd
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <h1>Tasks Type</h1>
        <div className="row d-flex justify-content-end mb-3">
          <div className="col-auto">
            <div className="input-group">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Search"
                  className="form-control"
                  value={filter.search}
                  name="search"
                  onChange={handleFilterChange}
                />
              </div>
            </div>
          </div>
        </div>
        <SettingTaskTable
          data={titles}
          handleShowTaskUpdateModal={HandleTitleUpdateShowModel}
          onDeleteTask={(id) => deleteTitle(id)}
          onSetDefaultTitle={HandleSetDefaultTitle}
        />
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

      {titleToUpdate && (
        <UpdateTaskTitleModal
          titleToUpdate={titleToUpdate}
          titleUpdateModel={showTitleUpdateModal}
          handleTitleModelClose={HandleTitleModelClose}
          handleTitleUpdate={HandleTitleUpdate}
        />
      )}
    </>
  );
}

export default Settings;
