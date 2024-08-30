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
interface MeetingsByDate {
  [key: string]: Meeting[];
}

const CalendarMeeting: React.FC = () => {
  const [isViewingMeetings, setIsViewingMeetings] = useState<boolean>(true);
  const [date, setDate] = useState<Date>(new Date());
  const [meetings, setMeetings] = useState<MeetingsByDate>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [newMeeting, setNewMeeting] = useState<Meeting>({
    date: null,
    members: [],
    time: "",
    purpose: "",
  });

  const handleDateClick = (date: Date) => {
    const meetingsForDate = meetings[date.toDateString()] || [];

    if (meetingsForDate.length > 0) {
      setIsViewingMeetings(true); // Set to view mode if meetings exist
      setSelectedMeeting(meetingsForDate[0]);
    } else {
      setIsViewingMeetings(false); // Set to create mode if no meetings exist
      setSelectedMeeting(null);
    }

    setNewMeeting({ ...newMeeting, date });
    setIsModalOpen(true);
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
      const meetingDateKey = newMeeting.date.toDateString();
      const updatedMeetings = {
        ...meetings,
        [meetingDateKey]: [...(meetings[meetingDateKey] || []), newMeeting],
      };
      setMeetings(updatedMeetings);
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
          const meetingsForDate = meetings[date.toDateString()] || [];
          if (meetingsForDate.length > 0) {
            return (
              <div>
                <button
                  className="meeting-indicator"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering onClickDay
                    handleDateClick(date);
                  }}
                >
                  M
                  {meetingsForDate.length > 1
                    ? ` (${meetingsForDate.length})`
                    : ""}
                </button>
              </div>
            );
          } else {
            return null;
          }
        }}
        onClickDay={handleDateClick}
      />
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            {isViewingMeetings ? (
              <div>
                <div className="modal-header">
                  <h2>Meetings on {selectedMeeting?.date?.toDateString()}</h2>
                  <button
                    className="close-button"
                    onClick={() => setIsModalOpen(false)}
                  >
                    ×
                  </button>
                </div>
                <div className="modal-body">
                  {meetings[selectedMeeting?.date?.toDateString() || ""].map(
                    (meeting, index) => (
                      <div key={index} className="meeting-details">
                        <p>
                          <strong>Invited By:</strong> {meeting.invitedBy} M
                          Tayyab
                        </p>
                        <p>
                          <strong>Members:</strong>{" "}
                          {meeting.members
                            .map((member) => member.label)
                            .join(", ")}
                        </p>
                        <p>
                          <strong>Time:</strong> {meeting.time}
                        </p>
                        <p>
                          <strong>Purpose:</strong> {meeting.purpose}
                        </p>
                      </div>
                    )
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    className="save-button"
                    onClick={() => setIsViewingMeetings(false)}
                  >
                    Add New Meeting
                  </button>
                  <button
                    className="close-button"
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
