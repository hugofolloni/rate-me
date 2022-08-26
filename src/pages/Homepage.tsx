import { useState } from "react";
import  cart from "../assets/cart.svg";
import { CartImage, HomepageDiv, FirstPartHomeDiv, SecondPartHomeCategoriesLink, FirstPartHomeH1, FirstPartHomeP, FirstParteHomeSearch, SecondPartHomeDiv, SecondPartHomeCategories, SecondPartHomeCategoriesP} from "../styles/styles";

const Homepage: React.FC = () => {

    const [search, setSearch] = useState<string>("");

    const handleSearch = () => {
        window.location.href = `search?q=${search}`;
    }

    const categories = ["Electronics", "Clothes", "Books", "Sports", "Music", "Games", "Decoration", "Other"];

    return (
        <HomepageDiv>
            <FirstPartHomeDiv>
                <FirstPartHomeH1>use rateme</FirstPartHomeH1>
                <FirstPartHomeP>Share what you think about what you bought and help other people to buy more consciently.</FirstPartHomeP>
                <FirstParteHomeSearch type="text"  placeholder="Search..." onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => {if(e.key === "Enter"){handleSearch()}}}/> 
            </FirstPartHomeDiv>
            <SecondPartHomeDiv>
                <SecondPartHomeCategoriesP>Search by category:</SecondPartHomeCategoriesP>
                <SecondPartHomeCategories>
                    {
                        categories.map((category, index) => {
                            return (
                                <SecondPartHomeCategoriesLink key={index} href={`category?q=${category}`}>{category}</SecondPartHomeCategoriesLink>
                            )
                        })
                    }
                </SecondPartHomeCategories>
            </SecondPartHomeDiv>
            <CartImage src={cart} alt="" />
        </HomepageDiv>
    );
}

export default Homepage;