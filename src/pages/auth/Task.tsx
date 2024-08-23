import React, { useState } from "react";

import "../../styles/pages/dashboard/Stask.css";
// import EditTaskModal from "./EditTaskModal"; // Ensure this path is correct
import NewMeetingModal from "./NewMeetingModal";

import { profileimg, plantseed } from "../../assets/images"; // Import image assets
const Task: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null); // Define proper type
  const handleEditClick = (task: any) => {
    setSelectedTask(task);
    setIsModalEditOpen(true);
  };

  const handleModalClose = () => {
    setIsModalEditOpen(false);
    setSelectedTask(null);
  };

  const handleSave = (updatedTask: any) => {
    // Update the task in your state here
    console.log("Updated task:", updatedTask);
  };
  const [tasks, setTasks] = useState([
    {
      id: 1,
      status: "Draft",
      title: "Task 1",
      assignedTo: "John Doe",
      profilePic: profileimg,
    },
    {
      id: 2,
      status: "Confirmed",
      title: "Task 2",
      assignedTo: "Jane Doe",
      profilePic: profileimg,
    },
    {
      id: 3,
      status: "Archieved",
      title: "Task 3",
      assignedTo: "Jim Doe",
      profilePic: profileimg,
    },
    {
      id: 4,
      status: "Draft",
      title: "Task 4",
      assignedTo: "Jake Smith",
      profilePic: profileimg,
    },
    {
      id: 5,
      status: "Confirmed",
      title: "Task 5",
      assignedTo: "Alice Johnson",
      profilePic: profileimg,
    },
    {
      id: 6,
      status: "Archieved",
      title: "Task 6",
      assignedTo: "Michael Brown",
      profilePic: profileimg,
    },
    {
      id: 7,
      status: "Draft",
      title: "Task 7",
      assignedTo: "Sarah Davis",
      profilePic: profileimg,
    },
    {
      id: 8,
      status: "Confirmed",
      title: "Task 8",
      assignedTo: "Emily Wilson",
      profilePic: profileimg,
    },
    {
      id: 9,
      status: "Archieved",
      title: "Task 9",
      assignedTo: "Chris Taylor",
      profilePic: profileimg,
    },

    // Add more tasks as needed
  ]);
  const [topics, setTopics] = useState([
    {
      id: 1,
      name: "Admin",
      subtopics: ["Subtopic 1.1", "Subtopic 1.2"],
      isOpen: false,
    },
    {
      id: 2,
      name: "Designer",
      subtopics: ["Subtopic 2.1", "Subtopic 2.2"],
      isOpen: false,
    },
    {
      id: 3,
      name: "Developer",
      subtopics: ["Subtopic 3.1", "Subtopic 3.2"],
      isOpen: false,
    },
    {
      id: 4,
      name: "HR",
      subtopics: ["Subtopic 1.1", "Subtopic 1.2"],
      isOpen: false,
    },
    {
      id: 5,
      name: "Manager",
      subtopics: ["Subtopic 2.1", "Subtopic 2.2"],
      isOpen: false,
    },
    {
      id: 6,
      name: "Tam Lead",
      subtopics: ["Subtopic 3.1", "Subtopic 3.2"],
      isOpen: false,
    },
  ]);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const moveTask = (id: number, newStatus: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const toggleSubtopics = (id: number) => {
    setTopics(
      topics.map((topic) =>
        topic.id === id ? { ...topic, isOpen: !topic.isOpen } : topic
      )
    );
  };
  return (
    <div className="main-container">
      <div className="button-container">
        <button className="addtask-button" onClick={openModal}>
          New Meeting
        </button>
        <img src={profileimg} alt="Profile" className="profile-pic" />
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Plant Seed</h2>
              <img src={plantseed} alt="Profile" className="seed-pic" />
            </div>
            <form>
              <div className="form-group">
                <label htmlFor="task-title">Task Title</label>
                <input type="text" id="task-title" name="taskTitle" />
              </div>
              <div className="form-group">
                <label htmlFor="assigned-to">Assigned To</label>
                <input type="text" id="assigned-to" name="assignedTo" />
              </div>
              <div className="form-group">
                <label htmlFor="due-date">Due Date</label>
                <input type="date" id="due-date" name="dueDate" />
              </div>
              <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <select id="priority" name="priority">
                  <option value="high" style={{ color: "red" }}>
                    High
                  </option>
                  <option value="medium" style={{ color: "orange" }}>
                    Medium
                  </option>
                  <option value="low" style={{ color: "yellow" }}>
                    Low
                  </option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="department">Department</label>
                <select id="department" name="department">
                  <option value="hr">HR</option>
                  <option value="engineering">Engineering</option>
                  <option value="sales">Sales</option>
                  <option value="marketing">Marketing</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="notes">Notes</label>
                <textarea id="notes" name="notes"></textarea>
              </div>
              <div className="button-group">
                <button type="submit">Preserve</button>
                <button type="button" onClick={closeModal}>
                  Unroot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* grid */}
      <div className="task-grid">
        {["Draft", "Confirmed", "Archieved"].map((status) => (
          <div key={status} className="task-column">
            <h2>{status}</h2>
            {tasks
              .filter((task) => task.status === status)
              .map((task) => (
                <div key={task.id} className="task-card">
                  <div className="task-status-circle">
                    <div className="task-title">{task.title}</div>
                    <div>
                      <div className="task-line"></div>
                    </div>
                  </div>
                  <div className="task-profile">
                    <div className="task-profileleft">
                      <img
                        src={task.profilePic}
                        alt="Profile"
                        className="profile-pic"
                      />
                      <div className="assigned-to">{task.assignedTo}</div>
                    </div>

                    <div
                      className="edit-icon"
                      // onClick={() => handleEditClick(task)}
                    >
                      ✎
                    </div>
                  </div>
                  <div className="assigned-tolastupdate">
                    Due on : 11/04/2024 06:00 PM
                  </div>
                  <div className="assigned-tolastupdate-container">
                    <div className="assigned-tolastupdate">
                      Last growth on: 12/04/2024
                    </div>
                    <div
                      className={`task-actions ${status
                        .toLowerCase()
                        .replace(/ /g, "-")
                        .replace(/[()]/g, "")}`}
                    >
                      <>
                        {console.log(
                          `task-actions ${status
                            .toLowerCase()
                            .replace(/ /g, "-")
                            .replace(/[()]/g, "")}`
                        )}
                        {status === "Draft" && (
                          <button
                            onClick={() => moveTask(task.id, "Confirmed")}
                          >
                            &rarr;
                          </button>
                        )}
                        {status === "Confirmed" && (
                          <>
                            <button onClick={() => moveTask(task.id, "Draft")}>
                              &larr;
                            </button>
                            <button
                              onClick={() => moveTask(task.id, "Archieved")}
                            >
                              &rarr;
                            </button>
                          </>
                        )}
                        {status === "Archieved" && (
                          <button
                            onClick={() => moveTask(task.id, "Confirmed")}
                          >
                            &larr;
                          </button>
                        )}
                      </>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>

      <NewMeetingModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
      />

      {/* {selectedTask && (
        <EditTaskModal
          isOpen={isModalEditOpen}
          onClose={handleModalClose}
          task={selectedTask}
          onSave={handleSave}
        />
      )} */}
    </div>
  );
};

export default Task;
