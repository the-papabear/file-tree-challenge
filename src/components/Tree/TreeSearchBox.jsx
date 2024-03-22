import Icon from "../Icon";

export const TreeSearchBox = (props) => {
  const { searchQueryValue, onSearchNodeClick, onSearchQueryChange } = props;

  return (
    <form className="searchBox">
      <input
        type="text"
        value={searchQueryValue}
        placeholder="Search node"
        className="searchBox__input"
        onChange={onSearchQueryChange}
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
