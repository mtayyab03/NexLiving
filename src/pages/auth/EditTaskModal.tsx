import React, { useState } from "react";
import "../../styles/pages/dashboard/EditTaskModal.css";

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: any; // Define a proper type based on your task structure
  onSave: (updatedTask: any) => void; // Adjust this type as needed
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  isOpen,
  onClose,
  task,
  onSave,
}) => {
  const [title, setTitle] = useState(task.title);
  const [startDate, setStartDate] = useState(task.startDate);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [priority, setPriority] = useState(task.priority);
  const [department, setDepartment] = useState(task.department);
  const [assignedTo, setAssignedTo] = useState(task.assignedTo);
  const [notes, setNotes] = useState(task.notes);
  const [comments, setComments] = useState<string[]>(task.comments || []);
  const [newComment, setNewComment] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);

  const handleSave = () => {
    onSave({
      ...task,
      title,
      startDate,
      dueDate,
      priority,
      department,
      assignedTo,
      notes,
      comments,
      attachments,
    });
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files));
    }
  };

  const handleAddComment = () => {
    if (newComment) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="editmodal-content">
        <div className="modal-header">
          <h2>Edit Task</h2>
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </div>
        <div className="modal-body">
          <div className="left-side">
            <label>Task Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>Assigned To</label>
            <input
              type="text"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            />

            <label>Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />

            <label>Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="High">High (Red)</option>
              <option value="Medium">Medium (Orange)</option>
              <option value="Low">Low (Yellow)</option>
            </select>

            <label>Department</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="Dept1">Department 1</option>
              <option value="Dept2">Department 2</option>
              <option value="Dept3">Department 3</option>
            </select>

            <label>Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="right-side">
            <div className="comments">
              <h3>Comments</h3>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <div className="button-side">
                <button onClick={handleAddComment}>Add leave</button>
              </div>
              <ul>
                {comments.map((comment, index) => (
                  <li key={index}>{comment}</li>
                ))}
              </ul>
            </div>

            <div className="attachments">
              <h3>Attachments</h3>
              <input type="file" multiple onChange={handleFileChange} />

              <div className="button-side">
                <button onClick={() => alert("Files saved")}>
                  Save Attachments
                </button>
              </div>
              <ul>
                {attachments.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={handleSave} className="save-button">
            Preserve
          </button>
          <button onClick={onClose} className="cancel-button">
            Unroot
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
