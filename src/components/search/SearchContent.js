import Footer from "../footer/Footer";
import NavigationBar from "../navbar/NavigationBar";
import SearchBody from "./SearchBody";

function SearchContent() {
    return (
        <div>
            <NavigationBar />
            <SearchBody />
            <Footer />
        </div>
    )
}

export default SearchContent;