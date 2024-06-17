import { FunctionComponent, useContext, useEffect } from "react";
import './Home.css';
import HomeCategory from "./HomeCategory";
import HomePost from "../../components/ListedPost";
import ListedProject from "../../components/ListedProject";
import Profile from "../../components/Profile/Profile";
import { PostsContext } from "../../contexts/Posts";
import _Post from "../../types/_Post";
import Loading from "../../components/Loading";
import { useNavigate, useSearchParams } from "react-router-dom";
import _Category from "../../types/_Category";

const Home: FunctionComponent = () => {
    const posts = useContext(PostsContext).posts as _Post[];
    const categories: _Category[] = ["project", "career", "algorithm", "study"];

    const router = useNavigate();
    const searchParams = useSearchParams()[0];
    const lost_url = searchParams.get("lost_url");

    useEffect(() => {
        if (lost_url) router(lost_url);
    }, [lost_url, router]);

    const renderCategory = (category: _Category) => {
        let count = 0;
        return (
            <HomeCategory key={category} isRow={category === "project"} category={category}>
                {
                    posts.map((post: _Post, idx) => {
                        if (post.category.toLowerCase() !== category.toLowerCase() || count >= 5)
                            return null;
                        count += 1;

                        if (category === "project")
                            return <ListedProject
                                key={idx}
                                post={post}
                            />
                        return <HomePost
                            key={idx}
                            post={post}
                        />
                    }).filter(post => post !== null)
                }
            </HomeCategory>
        );
    }

    return (
        <div id="home">

            <Profile />

            <main>
                {
                    posts.length ?
                        categories.map(renderCategory) :
                        <Loading phrase="Fetching data" />
                }
            </main>
        </div>
    );
}

export default Home;