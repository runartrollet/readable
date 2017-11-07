import { PostActions, PostActionType } from '../actions/'
import { LOCATION_CHANGE, LocationChangeAction } from 'react-router-redux'

export interface PostStateI {
  items: { [s: string]: {} }
  loading: boolean
  sending: boolean
  hasError: boolean
  selectedPost: string
  isVoting: boolean
  error: string
}
export const initialPostState: PostStateI = {
  items: {},
  loading: false,
  sending: false,
  hasError: false,
  isVoting: false,
  selectedPost: '',
  error: ''
}

export function posts(
  state: PostStateI = initialPostState,
  action: PostActionType | LocationChangeAction): PostStateI {
  switch (action.type) {
    case PostActions.LOADING:
      return { ...state, loading: action.loading }
    case PostActions.SENDING:
      return { ...state, sending: action.sending }
    case PostActions.VOTING:
      return { ...state, isVoting: action.isVoting }
    case PostActions.ERROR:
      const error = action.error || state.error
      return {
        ...state,
        hasError: action.hasError,
        error,
        loading: false,
        sending: false,
      }
    case LOCATION_CHANGE:
      const pathcomps = action.payload.pathname.split('/')
      const ignoreList = ['add', 'edit']
      if (
        pathcomps.length > 4 &&
        pathcomps[3] === 'post' &&
        ignoreList.indexOf(pathcomps[4]) === -1
      ) {
        const selectedPost = pathcomps[4]
        return { ...state, selectedPost }
      }
      return state
    case PostActions.RECIEVE:
      return {
        ...state,
        loading: false,
        items: action.posts.reduce(
          (map: any, obj: any) => {
            map[obj.id] = obj
            return map
          },
          { ...action.previousPosts }
        )
      }
    case PostActions.RECIEVEAFTERSEND:
      return {
        ...state,
        sending: false,
        items: { ...action.previousPosts, [action.post.id]: action.post }
      }
    default:
      return state
  }
}
