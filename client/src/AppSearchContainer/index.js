import AppSearch from './AppSearch'
import { connect } from 'react-redux'
import { initializeAppSearch } from './actions'

const mapStateToProps = state => {
  return {
    apps: state.appSearch.apps,
    appsBySection: state.appSearch.appsBySection,
    sections: state.appSearch.sections,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initializeAppSearch: (apps, appsBySection, sections) => {
      dispatch(initializeAppSearch(apps, appsBySection, sections));
    },
  };
};

const AppSearchContainer = connect(mapStateToProps, mapDispatchToProps)(AppSearch)

export default AppSearchContainer;
