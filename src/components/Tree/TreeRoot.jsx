import { useState, createContext, useEffect } from "react";

import "./tree.css";
import { TreeNode } from "./TreeNode";
import { findNodeByName } from "../../utils";
import { TreeSearchBox } from "./TreeSearchBox";

export const TreeDataContext = createContext();

export const TreeRoot = (props) => {
  const { nodes } = props;
  const savedNodes = JSON.parse(localStorage.getItem("nodes"));
  const [data, setData] = useState(savedNodes || nodes);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNodeName, setSelectedNodeName] = useState("");

  useEffect(() => {
    localStorage.setItem("nodes", JSON.stringify(data));
  }, [data]);

  const onSearchNodeClick = (e) => {
    e.preventDefault();

    const res = findNodeByName({
      nodes: data,
      newNodeName: searchQuery,
    });

    if (!res) {
      alert("No node found");
    }
  };

  return (
    <TreeDataContext.Provider
      value={{ data, setData, selectedNodeName, setSelectedNodeName }}
    >
      <div className="tree__container">
        <TreeSearchBox
          setSearchQuery={setSearchQuery}
          onSearchNodeClick={onSearchNodeClick}
        />
        {data.map((node) => {
          return <TreeNode key={node.name} node={node} />;
        })}
      </div>
    </TreeDataContext.Provider>
  );
};
