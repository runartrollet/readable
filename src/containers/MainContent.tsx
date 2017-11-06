import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { RouterState, push } from 'react-router-redux'
import CategoryHeader from '../components/CategoryHeader'
import PostList from '../components/PostList'
import {
  PostI,
  CategoryI,
  StoreStateI
} from '../interfaces'
import PostForm from '../components/PostForm'
import PostView from '../components/PostView'
import { mapCatagory } from '../store/mapper'
import { fetchSinglePost, fetchPosts, addPost } from '../actions/posts'
import FrontPage from './FrontPage'
import { withMyStyle, WithMyStyle } from '../style/base'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import Typography from 'material-ui/Typography'
import { initializeNewPost } from '../utils/ReadableAPI'
import urls from '../utils/urls'

interface SidebarContentProps {
  onSetOpen: (open: boolean) => void
  classes: any
}

export class SidebarContent extends React.Component
  <SidebarMappedProps & DispatchProps & WithMyStyle & DispatchProps> {
  componentDidMount() {
    this.retrievePosts()
  }
  componentWillReceiveProps(nextProps: SidebarMappedProps) {
    const newCategoryPath = nextProps.category.path
    if (this.props.category.path !== newCategoryPath) {
      this.retrievePosts(nextProps)
    }
  }
  retrievePosts = (nextProps?: SidebarMappedProps) => {
    const { postID, posts, postsAreLoading } = this.props
    if (!postsAreLoading || !posts.find(p => (p.id === postID))) {
      this.props.fetchSinglePost(this.props.postID)
    }
    const { category } = nextProps || this.props
    this.props.fetchPosts(category.path)
  }
  checkCorrectPath = (renderThis: JSX.Element) => {
    if (!this.props.category.path) {
      return (
        !this.props.categoriesAreloading && (
          <Typography color="error">Not a valid category</Typography>
        ))
    }
    return renderThis
  }
  render() {
    const {
      classes, category, posts, selectedPost,
      goTo,
      postIsSending, loading,
    } = this.props
    return (
      <main className={classes.content}>
        <Switch>
          <Route
            path="/category/:category/post/add"
            render={() => this.checkCorrectPath(
              <PostForm
                category={category}
                post={initializeNewPost(category.id)}
                onSubmit={this.props.addPost}
                postIsSending={postIsSending}
              />
            )
            }

          />
            <Route
              path="/category/:category/post/:postID"
              render={() =>
                selectedPost ? (
                this.checkCorrectPath(
                <PostView
                  post={selectedPost}
                />
              )) : (loading ? (
                <div>Finding your post....</div>
              ) : (
                <div>Post appears to not exist. It might have been deleted.</div>
              ))
              }
            />
          )

          <Route
            path="/category/"
            render={() => (this.checkCorrectPath(
              <div>
                <CategoryHeader category={category} type="header" />
                <Button
                  fab={true}
                  color="primary"
                  aria-label="add"
                  className={classes.button}
                  onClick={() => goTo(urls.addPost(category.id))}
                >
                  <AddIcon />
                </Button>
                <PostList
                  posts={posts.filter(
                    post => post.category === category.id)
                  }
                />
              </div>
            )
            )}
          />
          <Route
            exact={true}
            path="/"
            render={() => (
              <div>
                <FrontPage />
                <PostList
                  showCategory={true}
                  posts={posts}
                />
              </div>
            )}
          />
        </Switch>
      </main>
    )
  }
}
interface SidebarMappedProps extends SidebarContentProps {
  router: RouterState
  posts: PostI[]
  selectedPost: PostI
  postID: string
  category: CategoryI
  postIsSending: boolean
  postsAreLoading: boolean
  categoriesAreloading: boolean
  loading: boolean
}
const mapStateToProps = (state: StoreStateI, ownprops: any) => {
  const { categories, router, posts } = state
  return {
    posts: Object.keys(posts.items).map(key => posts.items[key]),
    category: mapCatagory(categories.selectedCatagory, categories.items),
    postID: posts.selectedPost,
    selectedPost: posts.items[posts.selectedPost],
    postIsSending: posts.sending,
    postsAreLoading: posts.loading,
    categoriesAreloading: categories.loading,
    loading: posts.sending || posts.loading || categories.loading,
    router: router,
    ...ownprops
  }
}
// export default connect(mapStateToProps)(withStyles((styles as any), { withTheme: true })(SidebarContent))

interface DispatchProps {
  fetchPosts: (category?: string) => void,
  fetchSinglePost: (postID: string) => void,
  addPost: (post: PostI) => void,
  goTo: (path: string) => void,
}

function mapDispatchToProps(dispatch: Dispatch<DispatchProps>, ): DispatchProps {
  return {
    fetchPosts: (category) => dispatch(fetchPosts(category)),
    fetchSinglePost: (postID) => dispatch(fetchSinglePost(postID)),
    addPost: (post) => dispatch(addPost(post)),
    goTo: (path: string) => dispatch(push(path)),
  }
}
export default connect(
  mapStateToProps, mapDispatchToProps
)(withMyStyle(SidebarContent))
