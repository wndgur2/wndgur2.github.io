import { FunctionComponent, useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";

import './SearchBar.css';
import { useLocation, useNavigate } from "react-router-dom";

interface SearchBarProps {

}

const SearchBar: FunctionComponent<SearchBarProps> = () => {
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);
    const [search, setSearch] = useState<string>("");
    let { state } = useLocation();

    useEffect(() => {
        if (state) setSearch(state.search_text);
    }, [state])

    return (
        <search className="search-bar">
            <FiSearch className="search-icon" onClick={() => {
                if (inputRef.current)
                    inputRef.current.focus();
            }} />
            <form
                onSubmit={
                    (e) => {
                        e.preventDefault();
                        if (search) navigate(`/search/${encodeURIComponent(search)}`, {
                            state: { search_text: search }
                        });
                        else navigate(`/`, {
                            state: { search_text: "" }
                        });
                    }
                }
            >
                <input
                    ref={inputRef}
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
        </search>
    );
}

export default SearchBar;