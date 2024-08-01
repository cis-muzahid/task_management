import React, { useEffect, useState } from "react";
import "../assest/css/datalist.css";
import { GetTaskTitleList } from "../services/apiContext";
const TaskCreate = ({ onAddTask, taskTitles, defaultTitle }) => {
  // console.log(defaultTitle)
  const initialData = {
    title: "",
    description: "",
    total_time_to_complete: "",
    status: "started",
  };

  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);
  const [datalist, setDatalist] = useState(false);

  useEffect(() => {
    console.log("runnninggggg");
    if (defaultTitle) {
      setData((prevData) => ({
        ...prevData,
        total_time_to_complete:
          Number(localStorage.getItem("time_to_complete")) || "",
        title: defaultTitle.name || "",
      }));
    }
    if (taskTitles) {
      setDatalist(taskTitles);
    }
  }, [taskTitles]);


  const handleAddMinutes = () => {
    setData((prevData) => ({
      ...prevData,
      total_time_to_complete: prevData.total_time_to_complete + 5,
    }));
  };

  const handleMinusMinutes = () => {
    setData((prevData) => {
      const newTimeToComplete = prevData.total_time_to_complete - 5;
      return newTimeToComplete >= 0
        ? { ...prevData, total_time_to_complete: newTimeToComplete }
        : prevData;
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleTitleSelect = (title) => {
    setData((prevData) => ({ ...prevData, title }));
    setShowDropdown(false);
  };

  const ShowDataList = () => {
    setShowDropdown(true);
  };

  const HideDataList = () => {
    setShowDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      onAddTask(data);
      setData((prevData) => ({
        ...prevData,
        total_time_to_complete: Number(
          localStorage.getItem("time_to_complete")
        ),
        title: "",
        description: "",
      }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!data.title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
    }

    return isValid;
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-2">
              <div className="form-group">
                <label htmlFor="timeToCompleteTask">Time(min)</label>
                <div className="d-flex">
                  <button
                    className="btn btn-sm btn-primary text-white mr-2"
                    onClick={handleMinusMinutes}
                  >
                    &nbsp;-&nbsp;
                  </button>
                  <input
                    type="text"
                    id="timeToCompleteTask"
                    className="form-control text-center"
                    style={{ width: "70px" }}
                    value={data.total_time_to_complete}
                    readOnly
                  />
                  <button
                    className="btn btn-sm btn-primary text-white ml-2"
                    onClick={handleAddMinutes}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md-10">
              <form onSubmit={handleSubmit} className="w-100">
                <div className="form-row align-items-end">
                  <div className="form-group col-md-4">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.title ? "is-invalid" : ""
                      }`}
                      id="title"
                      name="title"
                      value={data.title}
                      onChange={handleInputChange}
                      list="popular-titles"
                      onFocus={ShowDataList}
                      onBlur={HideDataList}
                    />
                    {/* <datalist id="popular-titles">
                      {taskTitles.map((title, index) => (
                        <option key={index} value={title} />
                      ))}
                    </datalist> */}
                    {/* <div className="position-relative">
                      <div className="datalist-wrapper" id="popular-titles">
                        {taskTitles.map((title, index) => (
                          <option key={index} value={title} />
                        ))}
                      </div>
                    </div> */}

                    {showDropdown && (
                      <div className="datalist-wrapper-create" id="popular-titles">
                        {datalist.map((title, index) => (
                          <div
                            key={index}
                            className="datalist-item"
                            onMouseDown={() => handleTitleSelect(title)}
                          >
                            {title}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="notes">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      name="description"
                      value={data.description}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group col-md-2">
                    <label htmlFor="">&nbsp;</label>
                    <button type="submit" className="btn btn-primary btn-block">
                      Start
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {errors ? (
            <div className="row align-items-center">
              <div className="col-md-4">
                <div className="form-group">
                  <div className="d-flex"></div>
                </div>
              </div>

              <div className="col-md-8">
                <div className="form-row align-items-end">
                  <div className="form-group col-md-6">
                    <small className="text-danger">{errors.title}</small>
                  </div>
                  <div className="form-group col-md-4"></div>
                  <div className="form-group col-md-2"></div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCreate;
