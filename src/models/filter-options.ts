export interface FilterOption {
  text: string;
  value: string;
}

export const levelOptions: FilterOption[] = [
  { text: 'All Levels', value: 'all' },
  { text: 'Beginner', value: 'Beginner' },
  { text: 'Intermediate', value: 'Intermediate' },
  { text: 'Advanced', value: 'Advanced' },
];

export const durationOptions: FilterOption[] = [
  { text: 'Any Duration', value: 'all' },
  { text: '1-4 weeks', value: 'short' },
  { text: '5-8 weeks', value: 'medium' },
  { text: '9+ weeks', value: 'long' },
];
