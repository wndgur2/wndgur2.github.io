import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import usePosts from "./hooks/usePosts";
import { PostsContext } from "./contexts/Posts";
import { DeviceContext } from "./contexts/Device";
import Layout from './pages/Layouts/Layout';
import Home from './pages/Home/Home';
import Post from "./pages/Post/Post";
import SearchResult from "./pages/Search/Search";
import NoPage from './pages/NoPage';
import { _Post } from "./types/_Post";

export default function App() {
    // let isBrowserDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    const [isDark, setIsDark] = useState(localStorage.getItem('theme') === 'light' ? false : true);
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const posts: _Post[] = usePosts();

    window.addEventListener('resize', () => {
        setInnerWidth(window.innerWidth);
    });

    useEffect(() => {
        const link = document.querySelector('link[rel="icon"]');
        if (!link) return;

        isDark ?
            link.setAttribute('href', '/favicon-dark.ico') :
            link.setAttribute('href', '/favicon-light.ico');
    }, [isDark]);

    return (
        <BrowserRouter>
            <DeviceContext.Provider value={{ isDark, setIsDark, innerWidth }}>
                <PostsContext.Provider value={{ posts }}>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route path="/search/:search_text" element={<SearchResult />} />
                            <Route path="/post/:post_title" element={<Post />} />
                            <Route path="*" element={<NoPage />} />
                        </Route>
                    </Routes>
                </PostsContext.Provider>
            </DeviceContext.Provider>
        </BrowserRouter>
    );
}