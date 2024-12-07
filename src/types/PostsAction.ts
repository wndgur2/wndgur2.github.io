import { _Post } from './_Post'

export default interface PostsAction {
  type: 'post/inserted'
  payload: _Post
}
