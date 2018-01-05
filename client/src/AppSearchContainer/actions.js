export const initializeAppSearch = (apps, appsBySection, sections) => {
  return {
    type: 'INITIALIZE_APPSEARCH',
    apps,
    appsBySection,
    sections,
    completed: false,
  };
}
