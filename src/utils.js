export const addChild = ({ nodes, parentName, child }) => {
  return nodes.map((node) =>
    node.name === parentName
      ? { ...node, children: [...node.children, child] }
      : {
          ...node,
          children: addChild({ nodes: node.children, parentName, child }),
        }
  );
};

export const updateNodeName = ({ nodes, newNodeName, selectedNodeName }) => {
  return nodes.map((node) =>
    node.name === selectedNodeName
      ? { ...node, name: newNodeName }
      : {
          ...node,
          children: updateNodeName({
            newNodeName,
            selectedNodeName,
            nodes: node.children,
          }),
        }
  );
};

export const findNodeByName = ({ nodes, newNodeName }) => {
  const foundNode = nodes.find((node) => {
    return node.name === newNodeName;
  });

  if (foundNode) {
    return foundNode;
  }

  for (const node of nodes) {
    if (node.children.length) {
      const result = findNodeByName({ nodes: node.children, newNodeName });

      if (result) {
        return result;
      }
    }
  }
};
