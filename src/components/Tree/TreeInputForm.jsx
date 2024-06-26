export const TreeInputForm = (props) => {
  const {
    value,
    placeholder,
    onValueChange,
    onSaveBtnClick,
    onCancelBtnClick,
  } = props;

  return (
    <form className="tree_inputForm">
      <input
        type="text"
        value={value}
        className="nameInput"
        onChange={onValueChange}
        placeholder={placeholder}
      />
      <div className="inputForm__btnContainer">
        <button
          type="submit"
          onClick={onSaveBtnClick}
          className="nameInput__btn"
        >
          Save Node
        </button>
        <button
          type="reset"
          onClick={onCancelBtnClick}
          className="nameInput__btn--destructive"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
