/**
 * Todo item type definition
 * Represents a single task in the todo list
 */
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Filter types for todo list
 * Used to filter which todos are displayed
 */
export type FilterType = 'all' | 'active' | 'completed';

/**
 * Todo statistics for displaying counts
 */
export interface TodoStats {
  total: number;
  active: number;
  completed: number;
}