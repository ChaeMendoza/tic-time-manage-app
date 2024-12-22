import { BiSolidEditAlt } from "react-icons/bi";

function EditTask({ onEdit }) {
  return (
    <div 
      className="mr-4 cursor-pointer text-blue-600 hover:text-blue-800 transition"
      onClick={onEdit}
    >
      <BiSolidEditAlt />
    </div>
  );
}

export default EditTask;
