import { FunctionComponent } from "react";
import './ListedPost.css';
import Tag from "./Tag";
import { Link } from "react-router-dom";
import { _Post } from "../types/_Post";
import CATEGORIES from "../consts/CATEGORIES";
import Markdown from "markdown-to-jsx";

interface ListedPostProps {
    post: _Post;
}

const ListedPost: FunctionComponent<ListedPostProps> = ({ post }: ListedPostProps) => {
    return (
        <Link className="listed-post link" to={`/post/${post.title}`}>
            <header>
                <h3>
                    <span>{post.title}</span>
                    {post.site && <small>{post.site}</small>}
                    {post.number && <small>{post.number}</small>}
                </h3>
                {post.category === CATEGORIES.PROJECT ?
                    <small>{post.date_started}~ {post.date_finished}</small> :
                    <small>{post.date_started}</small>
                }
            </header>
            <section className="preview">
                <Markdown options={{ overrides: { a: { component: (props: any) => <span {...props} /> } } }}>
                    {post.content + (post.code ? post.code : "")}
                </Markdown>
            </section>
            <ol className="tags" >
                {
                    post.tags.map((tag, index) => (
                        <Tag key={index} tag={tag} />
                    ))
                }
            </ol >
        </Link >
    );
}

export default ListedPost;