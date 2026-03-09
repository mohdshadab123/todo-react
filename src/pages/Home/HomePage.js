import React, { useEffect, useState } from "react";
import PopModel from "../../components/Layout/PopModel";
import TodoServices from "../../services/TodoServices";
import Card from "../../components/Card/Card";
import Navbar from "../../components/Layout/Navbar";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [allTask, setAllTask] = useState([]);

  const openModalHandler = () => {
    setShowModal(true);
  };

  // search
  const handleSearch = (e) => {
    const query = e.target.value;

    let filterList = allTask?.filter((item) =>
      item.title.toLowerCase().match(query.toLowerCase())
    );

    console.log("Filter list ===>", filterList);
    setSearchQuery(query);

    if (query && filterList.length > 0) {
      setAllTask(filterList && filterList);
    } else {
      getUserTask();
    }
  };

  // get user todo
  const getUserTask = async () => {
    const userData = JSON.parse(localStorage.getItem("todoapp"));
    const id = userData?.user?._id || userData?.user?.id;

    if (!id) {
      console.log("User ID not found in localStorage");
      return;
    }

    try {
      const { data } = await TodoServices.getAllTodo(id);
      setAllTask(data?.todos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserTask();
  }, []);

  return (
    <>
    <Navbar/>
    <div className="container">
      <div className="add-task d-flex justify-content-between align-items-center mb-3">
        <h1>Your Tasks</h1>

        <input
          type="search"
          className="form-control w-25"
          placeholder="Search your task"
          value={searchQuery}
          onChange={handleSearch}
        />

        <button className="btn btn-primary" onClick={openModalHandler}>
          Create Task <i className="fa-solid fa-plus"></i>
        </button>
      </div>

      {allTask && (
        <Card allTask={allTask} getUserTask={getUserTask} />
      )}

      <PopModel
        showModal={showModal}
        setShowModal={setShowModal}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        getUserTask={getUserTask}
      />
    </div>
    </>
  );
};

export default HomePage;