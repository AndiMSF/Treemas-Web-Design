
import "./search.css"

const Search = () => {
    return <form className="search">
    <div className="search__wrapper">
      <input type="text" name="" placeholder="Search For ...." className="search__field" />
      <button type="submit" className="fa fa-search search__icon"></button>
    </div>
  </form>
}

export default Search