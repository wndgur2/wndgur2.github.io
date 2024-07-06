import { FunctionComponent } from "react";
import { _Project } from "../types/_Post";
import Tag from "./Tag";
import './ListedProject.css';
import { Link } from "react-router-dom";
import parse from 'html-react-parser';
import { CiImageOff } from "react-icons/ci";

interface ListedProjectProps {
    post: _Project;
}

const ListedProject: FunctionComponent<ListedProjectProps> = ({ post }) => {

    return (
        <Link
            to={`/post/${post.title}`}
            className="project link"
        >
            <section>
                <div className="project-image-wrapper">
                    {post.thumbnail ? parse(post.thumbnail) :
                        <CiImageOff className="no-image" size={32} />
                    }
                </div>
                <div className="project-info">
                    <h2 className="project-title">{post.title}</h2>
                    <p>{post.description}</p>
                    <small className="project-date">{post.date_started}~ {post.date_finished}</small>
                </div>
            </section>
            <ol className="tags">
                {post.tags.map((tag, index) => (
                    <Tag key={index} tag={tag} />
                ))}
            </ol>
        </Link>
    );
}

export default ListedProject;