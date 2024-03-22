import { useContext, useState } from "react";

import Icon from "../Icon";
import { TreeDataContext } from "./TreeRoot";
import { addChild, findNodeByName, updateNodeName } from "../../utils";

export const TreeNode = (props) => {
  const { node } = props;
  const { data, setData, selectedNodeName, setSelectedNodeName } =
    useContext(TreeDataContext);

  const [newNodeName, setNewNodeName] = useState("");
  const [isNewNodeFormOpen, setIsNewNodeFormOpen] = useState(false);
  const [isEditNodeNameFormOpen, setIsEditNodeNameFormOpen] = useState(false);

  const onAddNodeClick = (e) => {
    setIsNewNodeFormOpen(true);
  };

  const handleNewNodeNameChange = (e) => {
    setNewNodeName(e.target.value);
  };

  const onSaveNodeClick = (e) => {
    e.preventDefault();

    const nameCheck = findNodeByName({ nodes: data, newNodeName });
    if (nameCheck) {
      return alert("Name already taken");
    }

    const values = addChild({
      nodes: data,
      parentName: selectedNodeName,
      child: { name: newNodeName, children: [] },
    });
    setData(values);

    setIsNewNodeFormOpen(false);
    setNewNodeName("");
  };

  const onCancelNewNodeClick = () => {
    setIsNewNodeFormOpen(false);
    setIsEditNodeNameFormOpen(false);
    setNewNodeName("");
  };

  const onEditNodeClick = () => {
    setIsEditNodeNameFormOpen(true);
    setNewNodeName(selectedNodeName);
  };

  const onSaveNodeNameClick = (e) => {
    e.preventDefault();
    const nameCheck = findNodeByName({ nodes: data, newNodeName });
    if (nameCheck) {
      return alert("Name already taken");
    }

    const values = updateNodeName({
      nodes: data,
      newNodeName,
      selectedNodeName,
    });
    setData(values);

    setIsEditNodeNameFormOpen(false);
    setNewNodeName("");
  };

  return (
    <div className="tree">
      <div
        className={`tree__node ${
          selectedNodeName === node.name ? "tree__node--selected" : ""
        }`}
        onClick={() => setSelectedNodeName(node.name)}
      >
        <Icon name="Folder" className="tree__icon" />
        {isEditNodeNameFormOpen ? (
          <NodeNameInputForm
            value={newNodeName}
            onSaveBtnClick={onSaveNodeNameClick}
            onValueChange={handleNewNodeNameChange}
            onCancelBtnClick={onCancelNewNodeClick}
          />
        ) : (
          <div className="tree__nameContainer">
            <p className="tree__nodeName ">{node.name}</p>
            {isNewNodeFormOpen ? (
              <NodeNameInputForm
                value={newNodeName}
                placeholder="Child node name..."
                onSaveBtnClick={onSaveNodeClick}
                onValueChange={handleNewNodeNameChange}
                onCancelBtnClick={onCancelNewNodeClick}
              />
            ) : (
              ""
            )}
          </div>
        )}
        <div className="tree__contextMenu">
          <button style={{ all: "unset" }} onClick={onEditNodeClick}>
            <Icon name="Pencil" />
          </button>
          <button style={{ all: "unset" }} onClick={onAddNodeClick}>
            <Icon name="FolderPlus" />
          </button>
        </div>
      </div>
      {node.children.length
        ? node.children.map((childNode) => (
            <TreeNode key={childNode.name} node={childNode} />
          ))
        : ""}
    </div>
  );
};

const NodeNameInputForm = ({
  value,
  placeholder,
  onValueChange,
  onSaveBtnClick,
  onCancelBtnClick,
}) => {
  return (
    <form className="tree_inputForm">
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onValueChange}
        className="nameInput"
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
