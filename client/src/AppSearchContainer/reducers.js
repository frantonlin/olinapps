const initialState = {
  apps: [],
  appsBySection: {},
  sections: [],
};

const appSearch = (state = initialState, action) => {
  switch (action.type) {
    case 'INITIALIZE_APPSEARCH':
      return Object.assign({}, state, {
        apps: action.apps,
        appsBySection: action.appsBySection,
        sections: action.sections,
      });
    default:
      return state;
  }
};

export default appSearch;
