import { FunctionComponent, useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";

import './SearchBar.css';
import { useLocation, useNavigate } from "react-router-dom";

interface SearchBarProps {

}

const SearchBar: FunctionComponent<SearchBarProps> = () => {
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);
    const [searchText, setSearchText] = useState<string>("");
    let { state } = useLocation();

    useEffect(() => {
        if (state) setSearchText(state.search_text);
    }, [state])

    function search (e: React.FormEvent) {
        e.preventDefault();
        if (searchText) {
            navigate(`/search/${encodeURIComponent(searchText)}`, {
                state: { search_text: searchText }
            })
        }
        else {
            navigate(`/`, {
                state: { search_text: "" }
            })
        }
    }

    return (
        <search className="search-bar clickable">
            <form className="search-form dimmed content" onSubmit={ search }>
                <input
                    ref={ inputRef }
                    value={ searchText }
                    onChange={ (e) => setSearchText(e.target.value) }
                />
                <button type="submit">
                    <FiSearch className="search-icon minor" />
                </button>
            </form>
        </search>
    );
}

export default SearchBar;