import React, { useState, useEffect } from "react";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import Select, { MultiValue } from "react-select";
import listPlugin from "@fullcalendar/list";
import "../../styles/pages/dashboard/FullCalendar.css";
interface Member {
  value: string;
  label: string;
}
interface Task {
  title: string;
  status: string;
  notes: string;
}

interface Meeting {
  title: string; // Add this line
  startDate: string;
  endDate: string;
  date: string;
  time: string;
  members: Member[];
  purpose: string;
  tasks?: Task[]; // Add tasks array to the meeting
  type: "meeting"; // Add type property
}
type CalendarEvent = Task | Meeting; // Union type
function FullCalendar() {
  const [calendar, setCalendar] = useState<Calendar | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [newMeeting, setNewMeeting] = useState<Meeting>({
    title: "",
    startDate: "",
    endDate: "",
    date: "",
    time: "",
    type: "meeting", // Add type property
    members: [],
    purpose: "",
  });
  const [meetings, setMeetings] = useState<{ [date: string]: Meeting[] }>({});
  const [selectedEvent, setSelectedEvent] = useState<Meeting | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const events = [
    {
      title: "All Day Event",
      start: "2024-08-01",
      color: "#ff5733", // Red color for the event
      type: "task", // Add type property
    },
    {
      title: "Long Event",
      start: "2024-08-21",
      end: "2024-08-23",
      color: "#ffaf00", // Orange color for the event
      type: "task", // Add type property
    },
    {
      title: "Meeting",
      start: "2024-08-25T10:30:00",
      end: "2024-08-25T12:30:00",
      color: "#00c6ff", // Blue color for the event
    },
    {
      title: "Lunch",
      start: "2024-08-25T12:00:00",
      color: "#00c6ff", // Blue color for the event
    },
    {
      title: "Event 1",
      start: "2024-08-23",
      end: "2024-08-23",
      time: "01:00 PM",
      type: "meeting", // Add type property
      members: [{ value: "user1", label: "User 1" }],
      purpose: "Discussion about project",
    },
    {
      title: "Tasks",
      start: "2024-08-23",
      color: "#7ec646", // Blue color for the event
      type: "task", // Add type property
      tasks: [
        {
          title: "Task 1",
          status: "In Progress",
          notes: "Complete by EOD",
        },
        {
          title: "Task 2",
          status: "Pending",
          notes: "Awaiting input from client",
        },
      ],
    },
    {
      title: "Event 2",
      start: "2024-08-05",
      end: "2024-08-07",
      time: "01:00 PM",
      members: [{ value: "user2", label: "User 2" }],
      type: "task", // Add type property
      purpose: "Planning session",
      tasks: [
        {
          title: "Task 1",
          status: "In Progress",
          notes: "Complete by EOD",
        },
        {
          title: "Task 2",
          status: "Pending",
          notes: "Awaiting input from client",
        },
      ],
    },
    {
      title: "Event 3",
      start: "2024-08-10",
      end: "2024-08-12",
      time: "01:00 PM",
      members: [{ value: "user3", label: "User 3" }],
      type: "task", // Add type property
      purpose: "Review meeting",
      tasks: [
        {
          title: "Task 1",
          status: "In Progress",
          notes: "Complete by EOD",
        },
        {
          title: "Task 2",
          status: "Pending",
          notes: "Awaiting input from client",
        },
      ],
    },
  ];
  useEffect(() => {
    const calendarContainer = document.getElementById("calendar-container");
    if (calendarContainer) {
      const calendarInstance = new Calendar(calendarContainer, {
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
        initialView: "dayGridMonth",
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,listWeek,",
        },
        themeSystem: "standard",
        locale: "en", // or your preferred locale

        events: [
          ...events.sort((a, b) => {
            if (a.type === "task" && b.type === "meeting") return -1;
            if (a.type === "meeting" && b.type === "task") return 1;
            return new Date(a.start).getTime() - new Date(b.start).getTime(); // Sort by start date
          }),
        ],
        eventClick: (info) => {
          handleEventClick(info.event);
        },
        contentHeight: "80vh", // Set calendar height to 90% of the viewport height
        handleWindowResize: true, // Automatically resize calendar on window resize
        windowResizeDelay: 100, // Delay in milliseconds after window resize before calendar adjusts its size
        stickyHeaderDates: true, // Fix date-headers at the top of the calendar while scrolling
        stickyFooterScrollbar: true, // Fix the view's horizontal scrollbar to the bottom while scrolling
      });
      console.log("Calendar instance created:", calendarInstance);
      setCalendar(calendarInstance);
      calendarInstance.render();
    } else {
      console.error("Could not find calendar container element");
    }
  }, []);
  const handleSaveMeeting = () => {
    const newMeetingEvent: Meeting = {
      title: newMeeting.title,
      startDate: newMeeting.startDate,
      endDate: newMeeting.endDate,
      date: newMeeting.date,
      time: newMeeting.time,
      members: newMeeting.members,
      purpose: newMeeting.purpose,
      type: "meeting", // Add type property
    };

    const existingMeetings = meetings[selectedDate] || [];
    setMeetings({
      ...meetings,
      [selectedDate]: [...existingMeetings, newMeetingEvent],
    });

    if (calendar) {
      calendar.addEvent({
        title: newMeeting.title,
        start: newMeeting.startDate,
        end: newMeeting.endDate,
        time: newMeeting.time,
        members: newMeeting.members,
        purpose: newMeeting.purpose,
        type: "meeting", // Add type property
      });
    }

    setIsModalOpen(false);
  };

  const handleEventClick = (event: any) => {
    const clickedEvent = {
      title: event.title,
      startDate: event.startStr,
      endDate: event.endStr,
      members: event.extendedProps.members || [],
      purpose: event.extendedProps.purpose || "",
      date: event.startStr.split("T")[0],
      time: event.extendedProps.time || "N/A",
      type: event.type,
    };

    const tasks = event.extendedProps.tasks || [];

    if (tasks.length > 0) {
      setSelectedEvent(null);
      setSelectedTask(tasks[0]); // Assuming you want to show the first task or handle accordingly
      setIsTaskModalOpen(true);
    } else {
      setSelectedEvent(clickedEvent);
      setSelectedTask(null);
      setIsViewModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  return (
    <div
      style={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{ width: "90%", display: "flex", justifyContent: "flex-end" }}
      >
        <button
          onClick={() => {
            setSelectedDate(""); // Optionally set a default date
            setIsModalOpen(true);
          }}
          style={{
            margin: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#7ec646",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add New Meeting
        </button>
      </div>
      <div
        id="calendar-container"
        style={{
          height: 600,
          width: "90%",
        }}
      ></div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add New Meeting</h2>
              <button
                className="close-button"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="left-side">
                <div className="modal-date">
                  <label>Title</label>
                  <input
                    type="text"
                    value={newMeeting.title}
                    onChange={(e) =>
                      setNewMeeting({ ...newMeeting, title: e.target.value })
                    }
                    placeholder="Meeting Title"
                  />
                </div>
                <div className="modal-date">
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={newMeeting.startDate}
                    onChange={(e) =>
                      setNewMeeting({
                        ...newMeeting,
                        startDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="modal-date">
                  <label>End Date</label>
                  <input
                    type="date"
                    value={newMeeting.endDate}
                    onChange={(e) =>
                      setNewMeeting({ ...newMeeting, endDate: e.target.value })
                    }
                  />
                </div>
                <label>Members</label>
                <Select
                  isMulti
                  options={[
                    { value: "user1", label: "User 1" },
                    { value: "user2", label: "User 2" },
                    { value: "user3", label: "User 3" },
                  ]}
                  onChange={(members: MultiValue<Member>) =>
                    setNewMeeting({
                      ...newMeeting,
                      members: members as Member[], // TypeScript now knows that members is an array of Member objects
                    })
                  }
                />
                <div className="modal-time">
                  <label>Time</label>
                  <input
                    type="time"
                    value={newMeeting.time}
                    onChange={(e) =>
                      setNewMeeting({ ...newMeeting, time: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="right-side">
                <label>Purpose</label>
                <textarea
                  value={newMeeting.purpose}
                  onChange={(e) =>
                    setNewMeeting({ ...newMeeting, purpose: e.target.value })
                  }
                  placeholder="Purpose of the meeting"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="save-button" onClick={handleSaveMeeting}>
                Save Meeting
              </button>
              <button
                className="cancel-button"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {isViewModalOpen && selectedEvent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Meeting Details</h2>
              <button
                className="close-button"
                onClick={() => setIsViewModalOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div>
                <p>
                  <strong>Title:</strong> {selectedEvent.title}
                </p>
                <p>
                  <strong>Start Date:</strong> {selectedEvent.startDate}
                </p>
                <p>
                  <strong>End Date:</strong> {selectedEvent.endDate}
                </p>
              </div>
              <div>
                <p>
                  <strong>Time:</strong> {selectedEvent.time || "N/A"}
                </p>
                <p>
                  <strong>Members:</strong>{" "}
                  {selectedEvent.members
                    .map((member) => member.label)
                    .join(", ")}
                </p>
                <p>
                  <strong>Purpose:</strong> {selectedEvent.purpose}
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="close-button"
                onClick={() => setIsViewModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {isTaskModalOpen && selectedTask && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Task Details</h2>
              <button
                className="close-button"
                onClick={() => setIsTaskModalOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>
                <strong>Title:</strong> {selectedTask.title}
              </p>
              <p>
                <strong>Status:</strong> {selectedTask.status}
              </p>
              <p>
                <strong>Notes:</strong> {selectedTask.notes}
              </p>
            </div>
          </div>
        </div>
      )}
      {/* {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Meetings on {selectedDate}</h2>
              <button
                className="close-button"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              {meetings[selectedDate] &&
                meetings[selectedDate].map((meeting: any, index: any) => (
                  <div key={index} className="meeting-details">
                    <p>
                      <strong>Invited By:</strong> {meeting.invitedBy} M Tayyab
                    </p>
                    <p>
                      <strong>Members:</strong>{" "}
                      {meeting.members
                        .map((member: any) => member.label)
                        .join(", ")}
                    </p>
                    <p>
                      <strong>Time:</strong> {meeting.time}
                    </p>
                    <p>
                      <strong>Purpose:</strong> {meeting.purpose}
                    </p>
                  </div>
                ))}
            </div>
            <div className="modal-footer">
              <button
                className="close-button"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default FullCalendar;
