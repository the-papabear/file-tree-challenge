import { useContext, useState } from "react";

import Icon from "../Icon";
import { TreeDataContext } from "./TreeRoot";
import { TreeInputForm } from "./TreeInputForm";
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

  const onEditNodeClick = () => {
    setIsEditNodeNameFormOpen(true);
    setNewNodeName(selectedNodeName);
  };

  const onTreeFormClose = () => {
    setNewNodeName("");
    setIsNewNodeFormOpen(false);
    setIsEditNodeNameFormOpen(false);
  };

  const onNewNodeNameChange = (e) => {
    setNewNodeName(e.target.value);
  };

  const onSaveChildNodeClick = (e) => {
    e.preventDefault();

    if (!newNodeName.trim()) {
      return alert("Node name cannot be empty");
    }

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

    onTreeFormClose();
  };

  const onSaveNodeNameClick = (e) => {
    e.preventDefault();

    if (!newNodeName.trim()) {
      return alert("Node name cannot be empty");
    }

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

    onTreeFormClose();
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
          <TreeInputForm
            value={newNodeName}
            placeholder="Node name..."
            onCancelBtnClick={onTreeFormClose}
            onValueChange={onNewNodeNameChange}
            onSaveBtnClick={onSaveNodeNameClick}
          />
        ) : (
          <div className="tree__nameContainer">
            <p className="tree__nodeName ">{node.name}</p>
            {isNewNodeFormOpen ? (
              <TreeInputForm
                value={newNodeName}
                placeholder="Child node name..."
                onCancelBtnClick={onTreeFormClose}
                onValueChange={onNewNodeNameChange}
                onSaveBtnClick={onSaveChildNodeClick}
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
