import { FaTrash } from "react-icons/fa";

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

export default DeleteTask;
