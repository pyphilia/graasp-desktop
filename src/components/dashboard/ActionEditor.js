import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import ReactJson from 'react-json-view';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { getDatabase } from '../../actions';
import Loader from '../common/Loader';
import Styles from '../../Styles';
import {
  SELECT_ALL_SPACES_ID,
  SELECT_ALL_USERS_ID,
} from '../../config/constants';

export class ActionEditor extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    classes: PropTypes.shape({
      button: PropTypes.string.isRequired,
    }).isRequired,
    dispatchGetDatabase: PropTypes.func.isRequired,
    database: PropTypes.shape({
      user: PropTypes.object,
      spaces: PropTypes.arrayOf(PropTypes.object),
      actions: PropTypes.arrayOf(PropTypes.object),
    }),
    spaceId: PropTypes.string,
    userId: PropTypes.string,
  };

  static defaultProps = {
    database: {},
    spaceId: SELECT_ALL_SPACES_ID,
    userId: SELECT_ALL_USERS_ID,
  };

  componentDidMount() {
    const { dispatchGetDatabase } = this.props;
    dispatchGetDatabase();
  }

  render() {
    const { database, t, spaceId, userId } = this.props;

    if (!database) {
      return <Loader />;
    }

    if (_.isEmpty(database)) {
      return <p>{t('The database is empty.')}</p>;
    }

    let { actions } = database;
    if (userId !== SELECT_ALL_USERS_ID) {
      actions = actions.filter(({ user }) => user === userId);
    }
    if (spaceId !== SELECT_ALL_SPACES_ID) {
      actions = actions.filter(({ spaceId: id }) => id === spaceId);
    }

    return (
      <div>
        <Typography variant="h6">{t('Action Database')}</Typography>
        <ReactJson name="actions" collapsed src={actions} />
      </div>
    );
  }
}

const mapStateToProps = ({ Developer }) => ({
  database: Developer.get('database'),
});

const mapDispatchToProps = {
  dispatchGetDatabase: getDatabase,
};

const StyledComponent = withStyles(Styles, { withTheme: true })(ActionEditor);
const TranslatedComponent = withTranslation()(StyledComponent);
const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(TranslatedComponent);

export default ConnectedComponent;
