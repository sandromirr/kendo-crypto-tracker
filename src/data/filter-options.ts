import type { FilterOption } from '../models/filter-option';

export const levelOptions: FilterOption[] = [
  { text: 'All Levels', value: 'all' },
  { text: 'Beginner', value: 'Beginner' },
  { text: 'Intermediate', value: 'Intermediate' },
  { text: 'Advanced', value: 'Advanced' },
];

export const durationOptions: FilterOption[] = [
  { text: 'Any Duration', value: 'any' },
  { text: 'Under 30 min', value: '0-30' },
  { text: '30 min - 1 hour', value: '30-60' },
  { text: '1 - 2 hours', value: '60-120' },
  { text: 'Over 2 hours', value: '120+' },
];
