import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { getGeolocationEnabled, setGeolocationEnabled } from '../../actions';
import Loader from './Loader';

const styles = theme => ({
  formControl: {
    margin: theme.spacing(),
    minWidth: 120,
  },
});

class GeolocationControl extends Component {
  static propTypes = {
    geolocationEnabled: PropTypes.bool.isRequired,
    activity: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired,
    dispatchGetGeolocationEnabled: PropTypes.func.isRequired,
    dispatchSetGeolocationEnabled: PropTypes.func.isRequired,
    classes: PropTypes.shape({
      formControl: PropTypes.string.isRequired,
    }).isRequired,
    isButton: PropTypes.bool,
  };

  static defaultProps = {
    isButton: false,
  };

  constructor(props) {
    super(props);
    const { dispatchGetGeolocationEnabled } = this.props;
    dispatchGetGeolocationEnabled();
  }

  handleClick = async () => {
    const { dispatchSetGeolocationEnabled } = this.props;
    dispatchSetGeolocationEnabled(true);
  };

  handleChange = async ({ target }) => {
    const { dispatchSetGeolocationEnabled } = this.props;
    const { checked } = target;
    dispatchSetGeolocationEnabled(checked);
  };

  render() {
    const {
      classes,
      t,
      geolocationEnabled,
      activity,
      isButton = false,
    } = this.props;

    if (activity) {
      return <Loader />;
    }

    const switchControl = (
      <Switch
        checked={geolocationEnabled}
        onChange={this.handleChange}
        value={geolocationEnabled}
        color="primary"
      />
    );

    return (
      <FormControl className={classes.formControl}>
        {isButton ? (
          <Button
            variant="contained"
            onClick={this.handleClick}
            color="primary"
            className={classes.button}
          >
            {t('Enable Geolocation')}
          </Button>
        ) : (
          <FormControlLabel
            control={switchControl}
            label={t('Geolocation Enabled')}
          />
        )}
      </FormControl>
    );
  }
}

const mapStateToProps = ({ User }) => ({
  geolocationEnabled: User.getIn(['current', 'geolocationEnabled']),
  activity: Boolean(User.getIn(['current', 'activity']).size),
});

const mapDispatchToProps = {
  dispatchGetGeolocationEnabled: getGeolocationEnabled,
  dispatchSetGeolocationEnabled: setGeolocationEnabled,
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(GeolocationControl);

const StyledComponent = withStyles(styles)(ConnectedComponent);

const TranslatedComponent = withTranslation()(StyledComponent);

export default TranslatedComponent;
