import React, { useState } from "react";
import "../../styles/pages/dashboard/NewMeetingModal.css";
import ActionableItemsModal from "./ActionableItemsModal";

interface NewMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (meeting: any) => void;
}

const NewMeetingModal: React.FC<NewMeetingModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [subject, setSubject] = useState("");
  const [held, setHeld] = useState("");
  const [location, setLocation] = useState("");
  const [actionableItems, setActionableItems] = useState("");
  const [attendees, setAttendees] = useState<string[]>([]);
  const [externalAttendees, setExternalAttendees] = useState<string[]>([]);
  const [meetingSummary, setMeetingSummary] = useState("");
  const [isActionableItemsModalOpen, setIsActionableItemsModalOpen] =
    useState(false);
  const [actionableItemsData, setActionableItemsData] = useState(null);

  const handleActionableItemsSave = (data: any) => {
    setActionableItemsData(data);
    // You can also update other state or perform additional actions here
  };
  const handleSave = () => {
    const newMeeting = {
      subject,
      held,
      location,
      actionableItems,
      attendees,
      externalAttendees,
      meetingSummary,

      status: "Draft", // Default to Draft
    };
    onSave(newMeeting);
    onClose();
  };

  const handleConfirm = () => {
    const newMeeting = {
      subject,
      held,
      location,
      actionableItems,
      attendees,
      externalAttendees,
      meetingSummary,

      status: "Confirmed", // Default to Confirmed
    };
    onSave(newMeeting);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>New Meeting</h2>
        <div className="form-group-row">
          <div className="form-group">
            <label>Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Held</label>
            <input
              type="text"
              value={held}
              onChange={(e) => setHeld(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Actionable Items</label>
          <button
            className="open-actionable-items-modal"
            onClick={() => setIsActionableItemsModalOpen(true)}
          >
            Open Actionable Items
          </button>
        </div>
        <div className="form-group">
          <label>Attendees</label>
          <select
            multiple
            onChange={(e) => setAttendees([...attendees, e.target.value])}
          >
            <option value="User 1">User 1</option>
            <option value="User 2">User 2</option>
            {/* Add more users as needed */}
          </select>
        </div>
        <div className="form-group">
          <label>External Attendees (Emails)</label>
          <input
            type="email"
            onChange={(e) =>
              setExternalAttendees([...externalAttendees, e.target.value])
            }
          />
        </div>
        <div className="form-group">
          <label>Meeting Summary</label>
          <textarea
            value={meetingSummary}
            onChange={(e) => setMeetingSummary(e.target.value)}
          />
        </div>

        <div className="modal-actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={handleConfirm}>Confirm</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>

      {isActionableItemsModalOpen && (
        <ActionableItemsModal
          isOpen={isActionableItemsModalOpen}
          onClose={() => setIsActionableItemsModalOpen(false)}
          onSave={handleActionableItemsSave}
        />
      )}
    </div>
  );
};

export default NewMeetingModal;
