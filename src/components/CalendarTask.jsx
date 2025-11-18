import { useState } from "react";
import { Calendar, GripVertical, Clock, CheckCircle2 } from "lucide-react";
import PropTypes from 'prop-types';

export default function CalendarTask({ tasks, onUpdateTaskDate }) {
  const [draggedTask, setDraggedTask] = useState(null);
  
  // Días de la semana
  const daysOfWeek = [
    { id: 'monday', name: 'Lunes' },
    { id: 'tuesday', name: 'Martes' },
    { id: 'wednesday', name: 'Miércoles' },
    { id: 'thursday', name: 'Jueves' },
    { id: 'friday', name: 'Viernes' },
    { id: 'saturday', name: 'Sábado' },
    { id: 'sunday', name: 'Domingo' }
  ];

  // Agrupar tareas por día
  const getTasksByDay = (dayId) => {
    return tasks.filter(task => task.scheduledDay === dayId);
  };

  // Tareas sin asignar
  const unscheduledTasks = tasks.filter(task => !task.scheduledDay);

  // Handlers para drag and drop
  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dayId) => {
    e.preventDefault();
    if (draggedTask) {
      onUpdateTaskDate(draggedTask.id, dayId);
      setDraggedTask(null);
    }
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const TaskCard = ({ task }) => (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, task)}
      onDragEnd={handleDragEnd}
      className={`p-3 mb-2 rounded-lg border-l-4 cursor-move transition-all hover:shadow-md ${getPriorityColor(task.priority)} ${
        draggedTask?.id === task.id ? 'opacity-50' : ''
      }`}
    >
      <div className="flex items-start gap-2">
        <GripVertical className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {task.completed && <CheckCircle2 className="w-4 h-4 text-green-600" />}
            <h4 className={`font-medium text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {task.title}
            </h4>
          </div>
          {task.description && (
            <p className="text-xs text-gray-600 mb-1 truncate">{task.description}</p>
          )}
          <div className="flex items-center gap-2 text-xs text-gray-500">
            {task.time && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {task.time}
              </span>
            )}
            <span className="capitalize">{task.category || 'General'}</span>
          </div>
        </div>
      </div>
    </div>
  );
  TaskCard.propTypes = {
    task: PropTypes.shape({
        title: PropTypes.string.isRequired,
        priority: PropTypes.oneOf(['high', 'medium', 'low']).isRequired,
        completed: PropTypes.bool,
        description: PropTypes.string,
        time: PropTypes.string,
        category: PropTypes.string,
        id: PropTypes.string.isRequired, // Add the id property here
    }).isRequired,
    };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 mt-24">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-6 h-6 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-800">Calendario Semanal</h2>
        </div>
        
        {/* Tareas sin programar */}
        {unscheduledTasks.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              📋 Tareas sin programar ({unscheduledTasks.length})
            </h3>
            <div className="text-sm text-gray-600 mb-3">
              Arrastra las tareas a un día de la semana para programarlas
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {unscheduledTasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Calendario de días */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        {daysOfWeek.map(day => {
          const dayTasks = getTasksByDay(day.id);
          return (
            <div
              key={day.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, day.id)}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-3">
                <h3 className="font-bold text-lg">{day.name}</h3>
                <p className="text-sm opacity-90">{dayTasks.length} tareas</p>
              </div>
              
              <div className="p-3 flex-1 min-h-[200px] bg-gray-50">
                {dayTasks.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-gray-400 text-sm text-center">
                    Arrastra tareas aquí
                  </div>
                ) : (
                  <div className="space-y-2">
                    {dayTasks.map(task => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Leyenda de prioridades */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Prioridades:</h3>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-l-4 border-l-red-500 bg-red-50 rounded"></div>
            <span>Alta</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-l-4 border-l-yellow-500 bg-yellow-50 rounded"></div>
            <span>Media</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-l-4 border-l-green-500 bg-green-50 rounded"></div>
            <span>Baja</span>
          </div>
        </div>
      </div>
    </div>
  );
}

CalendarTask.propTypes = {
  tasks: PropTypes.array.isRequired,
  onUpdateTaskDate: PropTypes.func.isRequired,
};