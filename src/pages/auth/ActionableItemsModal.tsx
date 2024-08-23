import React, { useState } from "react";
import "../../styles/pages/dashboard/ActionableItemsModal.css"; // Adjust the path as needed

const ActionableItemsModal = ({ isOpen, onClose, onSave }: any) => {
  const [attendees, setAttendees] = useState("");
  const [details, setDetails] = useState("");
  const [dueOn, setDueOn] = useState("");
  const [autoTaskCreation, setAutoTaskCreation] = useState(false);

  const handleSave = () => {
    const actionableItemData = {
      attendees,
      details,
      dueOn,
      autoTaskCreation,
    };
    onSave(actionableItemData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="actionable-items-modal">
      <div className="modal-content">
        <h3>Actionable Items</h3>

        <div className="form-group">
          <label>List of Attendees</label>
          <select
            value={attendees}
            onChange={(e) => setAttendees(e.target.value)}
          >
            <option value="">Select Attendees</option>
            <option value="Attendee 1">Attendee 1</option>
            <option value="Attendee 2">Attendee 2</option>
            {/* Add more options as needed */}
          </select>
        </div>

        <div className="form-group">
          <label>Details</label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Due On</label>
          <input
            type="date"
            value={dueOn}
            onChange={(e) => setDueOn(e.target.value)}
            min={new Date().toISOString().split("T")[0]} // Only today and future dates
          />
        </div>

        <div className="form-group-inline">
          <input
            type="checkbox"
            checked={autoTaskCreation}
            onChange={() => setAutoTaskCreation(!autoTaskCreation)}
          />
          <label className="checkbox-label">Auto Task Creation</label>
        </div>

        <div className="modal-actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ActionableItemsModal;
