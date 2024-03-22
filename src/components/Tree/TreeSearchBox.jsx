import Icon from "../Icon";

export const TreeSearchBox = ({ onSearchNodeClick, setSearchQuery }) => {
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <form className="searchBox">
      <input
        type="text"
        placeholder="Search node"
        className="searchBox__input"
        onChange={handleSearchChange}
      />
      <button
        type="submit"
        onClick={onSearchNodeClick}
        className="searchBox__btn"
      >
        <Icon name="Search" className="searchBox__btnIcon" />
      </button>
    </form>
  );
};
