import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { TaskCard } from './TaskCard';
import { Task, User } from '../types';
import { Plus, Circle } from 'lucide-react';

interface KanbanColumnProps {
  id: string;
  title: string;
  tasks: Task[];
  users: User[];
  onTaskClick: (task: Task) => void;
  onCreateTask: () => void;
  color: string;
}

export function KanbanColumn({
  id,
  title,
  tasks,
  users,
  onTaskClick,
  onCreateTask,
  color,
}: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({ id });

  const colorClasses = {
    blue: 'border-blue-200 bg-blue-50',
    yellow: 'border-yellow-200 bg-yellow-50',
    green: 'border-green-200 bg-green-50',
  };

  return (
    <div className="flex flex-col h-full w-80 flex-shrink-0">
      <div className={`border-2 border-dashed rounded-xl p-4 h-full ${colorClasses[color as keyof typeof colorClasses] || 'border-gray-200 bg-gray-50'}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Circle className={`w-3 h-3 fill-current ${color === 'blue' ? 'text-blue-500' : color === 'yellow' ? 'text-yellow-500' : 'text-green-500'}`} />
            <h2 className="font-semibold text-gray-900">{title}</h2>
            <span className="bg-white text-gray-600 text-sm px-2 py-1 rounded-full">
              {tasks.length}
            </span>
          </div>
          <button
            onClick={onCreateTask}
            className="p-1 text-gray-500 hover:text-gray-700 hover:bg-white rounded-md transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div
          ref={setNodeRef}
          className="space-y-3 min-h-24"
        >
          <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                users={users}
                onClick={() => onTaskClick(task)}
              />
            ))}
          </SortableContext>
          
          {tasks.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Circle className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Пока нет задач</p>
              <button
                onClick={onCreateTask}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-1"
              >
                Создать первую задачу
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}