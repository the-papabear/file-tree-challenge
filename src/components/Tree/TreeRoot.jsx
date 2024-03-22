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

  const onSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const onSearchNodeClick = (e) => {
    e.preventDefault();

    const foundNode = findNodeByName({
      nodes: data,
      newNodeName: searchQuery,
    });

    if (!foundNode) {
      return alert("No node found");
    }

    setSearchQuery("");
    setSelectedNodeName(foundNode.name);
  };

  return (
    <TreeDataContext.Provider
      value={{ data, setData, selectedNodeName, setSelectedNodeName }}
    >
      <div className="tree__container">
        <TreeSearchBox
          searchQueryValue={searchQuery}
          onSearchNodeClick={onSearchNodeClick}
          onSearchQueryChange={onSearchQueryChange}
        />
        {data.map((node) => {
          return <TreeNode key={node.name} node={node} />;
        })}
      </div>
    </TreeDataContext.Provider>
  );
};
