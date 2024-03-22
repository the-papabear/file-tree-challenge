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
  return nodes.find((node) => {
    const name = node.name === newNodeName;

    if (name) {
      return node;
    }

    if (node.children.length) {
      return findNodeByName({ nodes: node.children, newNodeName });
    }
  });
};
