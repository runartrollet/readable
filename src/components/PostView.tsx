import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'react-redux'
import { PostI } from '../interfaces'
import { CommentsRetriever } from './'

import { withMyStyle, WithMyStyle } from '../style'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import ThumbUp from 'material-ui-icons/ThumbUp'
import ThumbDown from 'material-ui-icons/ThumbDown'
import IconButton from 'material-ui/IconButton'
import * as ReactMarkdown from 'react-markdown'
import * as moment from 'moment'

export class PostViewC extends React.Component<{
  post: PostI
  isVoting: boolean
  onVote: (post: PostI, isUpvote: boolean) => void
} & WithMyStyle> {
  render() {
    const { classes, post, isVoting, onVote } = this.props
    const { author, title, body, voteScore, timestamp } = post
    return (
      <div className={classes.root}>
        <Paper className={classes.formRoot} elevation={4}>
          <Typography gutterBottom={true} type="headline" color="inherit">
            {title}
          </Typography>
          <Typography gutterBottom={true} type="subheading" color="inherit">
            <Grid container={true} justify="space-between" alignItems="baseline">
              <span>by {author}. {moment(timestamp).calendar()}</span>
              <Grid item={true}>
                {voteScore}
                <IconButton
                  className={[classes.voteButton, classes.upVoteButton].join(' ')}
                  aria-label="Vote up"
                  onClick={() => onVote(post, true)}
                  disabled={isVoting}
                  color="primary"
                >
                  <ThumbUp />
                </IconButton>
                <IconButton
                  className={[classes.voteButton, classes.downVoteButton].join(' ')}
                  aria-label="Vote down"
                  onClick={() => onVote(post, false)}
                  disabled={isVoting}
                >
                  <ThumbDown />
                </IconButton>

              </Grid>
            </Grid>
          </Typography>
        </Paper>
        <Paper className={classes.formRoot} elevation={4}>
          <ReactMarkdown source={body} />
        </Paper>
        <Paper className={classes.formRoot} elevation={4}>
          <CommentsRetriever post={post} />
        </Paper>
      </div>
    )
  }
}
function mapDispatchToProps(dispatch: Dispatch<any>, ownprops: any) {
  return {
    ...ownprops
  }
}

export const PostView = connect(null, mapDispatchToProps)(withMyStyle(PostViewC))
export default PostView
