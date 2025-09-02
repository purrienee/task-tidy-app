import { useState, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

interface AddTodoFormProps {
  onAdd: (text: string) => void;
}

/**
 * Form component for adding new todos
 * Features keyboard shortcuts and smooth animations
 */
export const AddTodoForm = ({ onAdd }: AddTodoFormProps) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex gap-3 mb-8">
      <Input
        type="text"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyPress}
        className="flex-1 h-12 text-base bg-card border-border 
                   focus:ring-2 focus:ring-primary focus:border-transparent
                   transition-all duration-200 placeholder:text-muted-foreground"
        autoFocus
      />
      <Button
        onClick={handleSubmit}
        disabled={!text.trim()}
        className="h-12 px-6 bg-gradient-primary hover:shadow-hover 
                   transition-all duration-200 disabled:opacity-50 
                   disabled:cursor-not-allowed group"
      >
        <Plus className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
        <span className="ml-2 hidden sm:inline">Add Task</span>
      </Button>
    </div>
  );
};