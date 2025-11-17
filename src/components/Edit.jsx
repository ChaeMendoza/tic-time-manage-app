import { BiSolidEditAlt } from "react-icons/bi";
import PropTypes from "prop-types";

function EditTask({ onEdit }) {
  return (
    <div 
      className="mr-4 cursor-pointer text-blue-600 hover:text-blue-800 transition"
      onClick={onEdit}
    >
      <BiSolidEditAlt />
    </div>
  )
}

EditTask.propTypes = {
  onEdit: PropTypes.func.isRequired,
};

export default EditTask;
