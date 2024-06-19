import { FunctionComponent, useEffect, useRef } from "react";
import './HomeCategory.css';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import _Category from "../../types/_Category";
interface HomeCategoryProps {
    category: _Category;
    children?: (JSX.Element | null)[];
}

const HomeCategory: FunctionComponent<HomeCategoryProps> = ({ category, children }: HomeCategoryProps) => {
    const plural = (category: _Category): string => {
        switch (category) {
            case 'project':
                return 'Projects';
            case 'algorithm':
                return 'Algorithms';
            case 'life':
                return 'Life';
            case 'study':
                return 'Study';
            case 'other':
                return 'Others';
        }
    }
    const postsRef = useRef<HTMLUListElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);

    const scrollPosts = (direction: "backward" | "forward") => {
        if (postsRef.current) {
            postsRef.current.scrollBy({
                left: direction === "backward" ? -300 : 300,
                behavior: 'smooth'
            });
        }
    }

    const changeScrollButtons = () => {
        if (!postsRef.current) return;
        if (!buttonsRef.current) return;
        if (postsRef.current.scrollLeft === 0)
            buttonsRef.current.querySelector('button:first-child')?.setAttribute('disabled', 'true');
        else
            buttonsRef.current.querySelector('button:first-child')?.removeAttribute('disabled');

        if (postsRef.current.scrollLeft + postsRef.current.getBoundingClientRect().width >= postsRef.current.scrollWidth * 0.99)
            buttonsRef.current.querySelector('button:last-child')?.setAttribute('disabled', 'true');
        else
            buttonsRef.current.querySelector('button:last-child')?.removeAttribute('disabled');

    }

    useEffect(() => {
        changeScrollButtons();
    }, [postsRef.current, buttonsRef.current, children]);

    return (
        <section className="home-category">
            <header>
                <Link className="link" to={`search/@${category}`} state={{ search_text: '@' + category }}>
                    <h1>{plural(category)}</h1>
                    <IoIosArrowForward className="arrow-wrapper" size={34} />
                </Link>
                <div className="scroll-buttons" ref={buttonsRef}>
                    <button onClick={() => scrollPosts("backward")}><IoIosArrowBack style={{ marginLeft: "-2px" }} className="icon" size={28} /></button>
                    <button onClick={() => scrollPosts("forward")}><IoIosArrowForward style={{ marginRight: "-2px" }} className="icon" size={28} /></button>
                </div>
            </header>
            <ul className="posts" ref={postsRef} onScroll={changeScrollButtons}>
                {
                    children && children.length ? children
                        : <div className="no-posts">No posts</div>
                }
            </ul>
        </section >
    );
}

export default HomeCategory;