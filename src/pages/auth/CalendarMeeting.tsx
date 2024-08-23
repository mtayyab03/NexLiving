import React, { useState } from "react";
import Calendar from "react-calendar";
import Select, { MultiValue } from "react-select";
import "react-calendar/dist/Calendar.css";
import "../../styles/pages/dashboard/CalendarScreen.css";

// Define the types for meeting and selected member
interface Member {
  value: string;
  label: string;
}

interface Meeting {
  date: Date | null;
  members: Member[];
  time: string;
  purpose: string;
  invitedBy?: string;
}

const CalendarMeeting: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [newMeeting, setNewMeeting] = useState<Meeting>({
    date: null,
    members: [],
    time: "",
    purpose: "",
  });

  const handleDateClick = (date: Date) => {
    const meetingForDate = meetings.find(
      (meeting) =>
        meeting.date &&
        new Date(meeting.date).toDateString() === date.toDateString()
    );

    if (meetingForDate) {
      setSelectedMeeting(meetingForDate);
      setIsModalOpen(true);
    } else {
      setSelectedMeeting(null);
      setNewMeeting({ ...newMeeting, date });
      setIsModalOpen(true);
    }
  };

  const handleMeetingClick = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    setIsModalOpen(true);
  };

  const handleSaveMeeting = () => {
    if (
      newMeeting.date &&
      newMeeting.members.length > 0 &&
      newMeeting.time &&
      newMeeting.purpose
    ) {
      setMeetings([...meetings, newMeeting]);
      setNewMeeting({
        date: null,
        members: [],
        time: "",
        purpose: "",
      });
    }
    setIsModalOpen(false);
  };
  const handleDateChange = (
    value: Date | Date[] | null,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    // Ensure that value is a single Date
    if (value instanceof Date) {
      setDate(value);
    }
  };
  return (
    <div className="calendar-container">
      <Calendar
        onChange={(value, event) =>
          handleDateChange(value as Date | Date[] | null, event)
        }
        value={date}
        tileContent={({ date }: { date: Date }) => {
          const meetingForDate = meetings.find(
            (meeting) =>
              meeting.date &&
              new Date(meeting.date).toDateString() === date.toDateString()
          );
          return meetingForDate ? (
            <button
              className="meeting-indicator"
              onClick={() => handleMeetingClick(meetingForDate)}
            >
              M
            </button>
          ) : null;
        }}
        onClickDay={handleDateClick}
      />
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            {selectedMeeting ? (
              <div>
                <div className="modal-header">
                  <h2>Meeting Details</h2>
                  <button
                    className="close-button"
                    onClick={() => setIsModalOpen(false)}
                  >
                    ×
                  </button>
                </div>
                <div className="modal-body">
                  <div className="left-side">
                    <p>
                      <strong>Invited By:</strong> {selectedMeeting.invitedBy}
                      Tayyab
                    </p>
                    <p>
                      <strong>Members:</strong>{" "}
                      {selectedMeeting.members
                        .map((member) => member.label)
                        .join(", ")}
                    </p>
                  </div>
                  <div className="right-side">
                    <p>
                      <strong>Time:</strong> {selectedMeeting.time}
                    </p>
                    <p>
                      <strong>Purpose:</strong> {selectedMeeting.purpose}
                    </p>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    className="save-button"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div>
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
                      <label>Date</label>
                      <p>
                        {newMeeting.date
                          ? new Date(newMeeting.date).toDateString()
                          : ""}
                      </p>
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
                          members: members as Member[],
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
                        setNewMeeting({
                          ...newMeeting,
                          purpose: e.target.value,
                        })
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
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarMeeting;
