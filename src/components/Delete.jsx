import { FaTrash } from "react-icons/fa";
import PropTypes from "prop-types";

function DeleteTask({ onDelete }) {
  return (
    <div 
      className="cursor-pointer text-red-600 hover:text-red-800 transition"
      onClick={onDelete}
      >
      <FaTrash />
    </div>
  )
}

DeleteTask.propTypes = {
  onDelete: PropTypes.func.isRequired,
}

export default DeleteTask;
