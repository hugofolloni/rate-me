import {useState} from "react";

const Homepage: React.FC = () => {

    const [search, setSearch] = useState("");

    const handleSearch = () => {
        window.location.href = `search?q=${search}`;
    }

    return (
        <div>
            <h1>rateme</h1>
            <p>An app to store item rates and help other people to find the best product.</p>
            <input type="text"  onChange={(e) => setSearch(e.target.value)}/> 
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default Homepage;