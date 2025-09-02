import { Button } from '@/components/ui/button';
import { FilterType, TodoStats } from '@/types/todo';
import { cn } from '@/lib/utils';

interface TodoFiltersProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  stats: TodoStats;
  onClearCompleted: () => void;
}

/**
 * Filter buttons and statistics component
 * Allows users to filter todos and clear completed items
 */
export const TodoFilters = ({
  currentFilter,
  onFilterChange,
  stats,
  onClearCompleted
}: TodoFiltersProps) => {
  const filters: { key: FilterType; label: string; count?: number }[] = [
    { key: 'all', label: 'All', count: stats.total },
    { key: 'active', label: 'Active', count: stats.active },
    { key: 'completed', label: 'Completed', count: stats.completed },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-gradient-card rounded-lg border border-border shadow-sm">
      {/* Filter buttons */}
      <div className="flex items-center gap-2">
        {filters.map(({ key, label, count }) => (
          <Button
            key={key}
            variant={currentFilter === key ? "default" : "ghost"}
            size="sm"
            onClick={() => onFilterChange(key)}
            className={cn(
              "transition-all duration-200 relative",
              currentFilter === key
                ? "bg-gradient-primary text-primary-foreground shadow-md"
                : "hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {label}
            {count !== undefined && (
              <span className={cn(
                "ml-2 px-2 py-0.5 text-xs rounded-full",
                currentFilter === key
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}>
                {count}
              </span>
            )}
          </Button>
        ))}
      </div>

      {/* Stats and clear button */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span>
          {stats.active} of {stats.total} tasks remaining
        </span>
        {stats.completed > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearCompleted}
            className="text-destructive hover:bg-destructive-light hover:text-destructive transition-colors duration-200"
          >
            Clear completed ({stats.completed})
          </Button>
        )}
      </div>
    </div>
  );
};