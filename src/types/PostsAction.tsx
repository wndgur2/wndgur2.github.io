import { _Post } from "./_Post";

export default interface PostsAction {
    type: "INSERT_POST";
    payload: _Post;
}