import { useState, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Edit2, Trash2, Check, X } from 'lucide-react';
import { Todo } from '@/types/todo';
import { cn } from '@/lib/utils';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

/**
 * Individual todo item component with inline editing
 * Features smooth animations and accessibility support
 */
export const TodoItem = ({ todo, onToggle, onUpdate, onDelete }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const startEditing = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditText(todo.text);
  };

  const saveEditing = () => {
    if (editText.trim() && editText !== todo.text) {
      onUpdate(todo.id, editText);
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      saveEditing();
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  };

  return (
    <div className={cn(
      "group flex items-center gap-4 p-4 bg-gradient-card rounded-lg border border-border",
      "shadow-sm hover:shadow-md transition-all duration-200 animate-slide-in",
      todo.completed && "opacity-75"
    )}>
      {/* Completion checkbox */}
      <div className="flex-shrink-0">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={() => onToggle(todo.id)}
          className={cn(
            "w-5 h-5 transition-all duration-200",
            todo.completed && "animate-checkmark"
          )}
        />
      </div>

      {/* Todo text or edit input */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <Input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyPress}
            onBlur={saveEditing}
            className="border-primary focus:ring-primary"
            autoFocus
          />
        ) : (
          <span
            className={cn(
              "text-foreground transition-all duration-200 cursor-pointer",
              todo.completed && "line-through text-muted-foreground"
            )}
            onClick={startEditing}
          >
            {todo.text}
          </span>
        )}
      </div>

      {/* Action buttons */}
      <div className={cn(
        "flex items-center gap-2 transition-opacity duration-200",
        "opacity-0 group-hover:opacity-100",
        isEditing && "opacity-100"
      )}>
        {isEditing ? (
          <>
            <Button
              size="sm"
              variant="ghost"
              onClick={saveEditing}
              className="p-2 hover:bg-success-light hover:text-success transition-colors duration-200"
            >
              <Check className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={cancelEditing}
              className="p-2 hover:bg-destructive-light hover:text-destructive transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </Button>
          </>
        ) : (
          <>
            <Button
              size="sm"
              variant="ghost"
              onClick={startEditing}
              className="p-2 hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDelete(todo.id)}
              className="p-2 hover:bg-destructive-light hover:text-destructive transition-colors duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};