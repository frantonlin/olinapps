import AppSearch from './AppSearch'
import { connect } from 'react-redux'
import { initializeAppSearch } from './actions'

const mapStateToProps = state => {
  return {
    apps: state.appSearch.apps,
    sections: state.appSearch.sections,
    visibleSections: state.appSearch.visibleSections,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initializeAppSearch: (apps, sections) => {
      dispatch(initializeAppSearch(apps, sections));
    },
  };
};

const AppSearchContainer = connect(mapStateToProps, mapDispatchToProps)(AppSearch)

export default AppSearchContainer;
