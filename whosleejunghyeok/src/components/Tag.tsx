import { FunctionComponent, useEffect, useRef } from "react";
import './Tag.css';
import { useLocation, useNavigate } from "react-router-dom";

interface TagProps {
    tag: string;
}

const Tag: FunctionComponent<TagProps> = ({ tag }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const tagRef = useRef<HTMLLIElement>(null);
    useEffect(() => {
        if (!location.state) return;
        if (!tagRef.current) return;
        console.log(location.state.search_text.replace("#", "").split(" "));
        if (location.state.search_text.replaceAll("#", "").split(" ").includes(tag))
            tagRef.current.classList.add("tag-active");
        else
            tagRef.current.classList.remove("tag-active");
    }, [location.state, tag]);
    return (
        <li
            ref={tagRef}
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