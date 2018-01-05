const appSearch = (state = {}, action) => {
  switch (action.type) {
    case 'INITIALIZE_APPSEARCH':
      state = {
        apps: action.apps,
        sections: action.sections,
        visibleSections: action.sections,
      };
      return state;
    default:
      return state;
  }
};

export default appSearch;
