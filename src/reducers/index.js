import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import Space from './SpaceReducer';
import Phase from './PhaseReducer';

export default combineReducers({
  Space,
  Phase,
  toastr,
});
