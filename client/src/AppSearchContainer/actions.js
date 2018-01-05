export const initializeAppSearch = (apps, sections) => {
  return {
    type: 'INITIALIZE_APPSEARCH',
    apps,
    sections,
    completed: false,
  };
}
