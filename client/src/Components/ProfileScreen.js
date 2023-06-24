import "./ProfileScreen.css"
import Appbar from "./Appbar";
import SearchBar from "./SearchBar";

export default function ProfileScreen() {
  return (
    <div className="profilebg">
      <Appbar/>
      <SearchBar/>
    </div>
  );
}