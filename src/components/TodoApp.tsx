import { useTodos } from '@/hooks/use-todos';
import { AddTodoForm } from '@/components/AddTodoForm';
import { TodoItem } from '@/components/TodoItem';
import { TodoFilters } from '@/components/TodoFilters';
import { CheckCircle2, Circle } from 'lucide-react';

/**
 * Main TodoApp component
 * Orchestrates all todo functionality and provides the main layout
 */
export const TodoApp = () => {
  const {
    todos,
    filter,
    stats,
    setFilter,
    addTodo,
    toggleTodo,
    updateTodo,
    deleteTodo,
    clearCompleted,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <CheckCircle2 className="w-10 h-10 text-primary" />
              <Circle className="w-6 h-6 text-primary/30 absolute -top-1 -right-1" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Todo App
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Stay organized and get things done
          </p>
        </header>

        {/* Add todo form */}
        <AddTodoForm onAdd={addTodo} />

        {/* Main content */}
        <div className="space-y-6">
          {/* Filters */}
          <TodoFilters
            currentFilter={filter}
            onFilterChange={setFilter}
            stats={stats}
            onClearCompleted={clearCompleted}
          />

          {/* Todo list */}
          <div className="space-y-3">
            {todos.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  {filter === 'completed' ? 'No completed tasks' : 
                   filter === 'active' ? 'No active tasks' : 'No tasks yet'}
                </h3>
                <p className="text-muted-foreground">
                  {filter === 'all' 
                    ? 'Add your first task to get started!'
                    : `Switch to "All" to see ${filter === 'active' ? 'completed' : 'active'} tasks`
                  }
                </p>
              </div>
            ) : (
              todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onUpdate={updateTodo}
                  onDelete={deleteTodo}
                />
              ))
            )}
          </div>

          {/* Progress indicator */}
          {stats.total > 0 && (
            <div className="bg-gradient-card rounded-lg border border-border p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-foreground">Progress</span>
                <span className="text-sm text-muted-foreground">
                  {stats.completed}/{stats.total} completed
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-success transition-all duration-500 ease-out"
                  style={{ 
                    width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%` 
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Built with React, TypeScript, and Tailwind CSS
          </p>
        </footer>
      </div>
    </div>
  );
};