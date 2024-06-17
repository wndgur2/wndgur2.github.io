import { FunctionComponent } from "react";
import './Tag.css';
import { useNavigate } from "react-router-dom";

interface TagProps {
    tag: string;
}

const Tag: FunctionComponent<TagProps> = ({ tag }) => {
    const navigate = useNavigate();
    return (
        <li
            className="tag"
            onClick={
                (e) => {
                    e.preventDefault(); // x e.stopPropagation()
                    e.stopPropagation();
                    navigate(`/search/%23${tag}`, { state: { search_text: `#${tag}` } });
                }
            }
        >
            {tag}
        </li>
    );
}

export default Tag;