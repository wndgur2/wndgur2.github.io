import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Tag from "../../components/Tag";
import { _Post } from "../../types/_Post";
import { PostsContext } from "../../contexts/Posts";
import Markdown from "markdown-to-jsx";
import Loading from "../../components/Loading";
import hljs from "highlight.js";
import 'highlight.js/styles/github-dark-dimmed.css';
import "./Post.css";
import { IoLogoGithub } from "react-icons/io";

const Post: FunctionComponent = () => {
    const posts: _Post[] = useContext(PostsContext).posts;
    const title = useParams().post_title;
    const [post, setPost] = useState<_Post>();

    useEffect(() => {
        const nodes = document.querySelectorAll('pre code');
        nodes.forEach((node) => {
            hljs.highlightElement(node as HTMLElement);
        })
    }, [post]);

    useEffect(() => {
        if (!posts) return;
        setPost(posts.find(_post => _post.title === title));
    }, [posts, title]);

    return (
        <div className="post-container">{
            post ?
                <div className="post">
                    <header>
                        <section className="post-title">
                            <h1>{title}</h1>
                            <ol className="tags">
                                {
                                    post.tags.map((tag: string, index: number) => (
                                        <Tag key={index} tag={tag} />
                                    ))
                                }
                            </ol>
                        </section>
                        <section className="post-meta">
                            {
                                post.github &&
                                <Link className="link"
                                    to={post.github}
                                    rel="noreferrer"
                                    target="_blank"
                                >
                                    <IoLogoGithub size={42} />
                                </Link>
                            }
                            <small>{post.date_started} ~  {post.date_finished}</small>
                        </section>
                    </header>
                    <main className="post-content">
                        <Markdown options={{ wrapper: 'div', }}>
                            {
                                post.content +
                                (post.category === "algorithm" ?
                                    "\n\n```" + post.language + "\n\n" + post.code + "```" : "")
                            }
                        </Markdown>
                    </main>
                </div> :
                <Loading phrase="Loading post" />
        }</div>
    );
}

export default Post;