import * as React from 'react'
import List from 'material-ui/List'
import { CommentI } from '../interfaces'
import { CommentItem } from './'

export const CommentsList = (props: {
  comments: CommentI[]
}) => {
  return (
    <List>
      {props.comments.map(comment => (
        <CommentItem comment={comment} key={comment.id} />
      ))}
    </List>
  )
}
