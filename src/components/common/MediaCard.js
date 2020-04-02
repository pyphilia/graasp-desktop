import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteButton from '../space/DeleteButton';
import ClearButton from '../space/ClearButton';
import ExportButton from '../space/ExportButton';
import SyncButton from '../space/SyncButton';
import Text from './Text';
import { MIN_CARD_WIDTH } from '../../config/constants';
import {
  buildSpaceCardId,
  SPACE_DESCRIPTION_EXPAND_BUTTON_CLASS,
  buildSpaceCardDescriptionId,
  SPACE_CARD_LINK_CLASS,
} from '../../config/selectors';

const styles = theme => ({
  card: {
    width: '100%',
    minWidth: MIN_CARD_WIDTH,
    margin: 'auto',
    marginBottom: 15,
  },
  cardDescription: { margin: 0, paddingTop: 0, paddingBottom: 0 },
  cardDescriptionText: {
    '& p': {
      fontSize: 'large',
    },
  },
  media: {
    height: 300,
  },
  leftIcon: {
    marginRight: theme.spacing(),
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
});

export const MediaCard = props => {
  const { classes, image, text, viewLink, space, showActions } = props;
  const { id, name } = space;
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card id={buildSpaceCardId(id)} className={classes.card}>
      <CardActionArea className={SPACE_CARD_LINK_CLASS} onClick={viewLink}>
        <CardMedia className={classes.media} image={image} title={name} />

        <CardContent>
          <Typography variant="h5" component="h2">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>

      <Collapse disableSpacing in={expanded} timeout="auto" unmountOnExit>
        <CardContent className={classes.cardDescription}>
          <Text
            id={buildSpaceCardDescriptionId(id)}
            content={text}
            className={classes.cardDescriptionText}
          />
        </CardContent>
      </Collapse>

      {showActions && (
        <CardActions disableSpacing>
          <ClearButton spaceId={id} />
          <DeleteButton id={id} />
          <ExportButton space={space} />
          <SyncButton id={id} />

          {text && (
            <IconButton
              className={clsx(
                classes.expand,
                {
                  [classes.expandOpen]: expanded,
                },
                SPACE_DESCRIPTION_EXPAND_BUTTON_CLASS
              )}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          )}
        </CardActions>
      )}
    </Card>
  );
};

MediaCard.propTypes = {
  classes: PropTypes.shape({
    media: PropTypes.string.isRequired,
    card: PropTypes.string.isRequired,
    cardDescription: PropTypes.string.isRequired,
    cardDescriptionText: PropTypes.string.isRequired,
    expand: PropTypes.string.isRequired,
    expandOpen: PropTypes.string.isRequired,
  }).isRequired,
  space: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  image: PropTypes.string.isRequired,
  text: PropTypes.string,
  viewLink: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
};

MediaCard.defaultProps = {
  text: '',
  showActions: false,
};

export default withStyles(styles)(MediaCard);
