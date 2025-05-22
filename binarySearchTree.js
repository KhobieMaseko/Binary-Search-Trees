class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  // Helper function to sort and remove duplicates
  _processArray(array) {
    return [...new Set(array)].sort((a, b) => a - b);
  }

  // Build balanced BST
  buildTree(array) {
    const processedArray = this._processArray(array);
    return this._buildTreeHelper(processedArray, 0, processedArray.length - 1);
  }

  _buildTreeHelper(array, start, end) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const node = new Node(array[mid]);

    node.left = this._buildTreeHelper(array, start, mid - 1);
    node.right = this._buildTreeHelper(array, mid + 1, end);

    return node;
  }

  // Insert value
  insert(value) {
    this.root = this._insertHelper(this.root, value);
  }

  _insertHelper(node, value) {
    if (node === null) return new Node(value);

    if (value < node.data) {
      node.left = this._insertHelper(node.left, value);
    } else if (value > node.data) {
      node.right = this._insertHelper(node.right, value);
    }

    return node;
  }

  // Delete value
  deleteItem(value) {
    this.root = this._deleteHelper(this.root, value);
  }

  _deleteHelper(node, value) {
    if (node === null) return null;

    if (value < node.data) {
      node.left = this._deleteHelper(node.left, value);
    } else if (value > node.data) {
      node.right = this._deleteHelper(node.right, value);
    } else {
      // Node with only one child or no child
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

      // Node with two children
      node.data = this._minValue(node.right);
      node.right = this._deleteHelper(node.right, node.data);
    }

    return node;
  }

  _minValue(node) {
    let min = node.data;
    while (node.left !== null) {
      min = node.left.data;
      node = node.left;
    }
    return min;
  }

  // Find value
  find(value) {
    return this._findHelper(this.root, value);
  }

  _findHelper(node, value) {
    if (node === null) return null;
    if (node.data === value) return node;

    if (value < node.data) {
      return this._findHelper(node.left, value);
    } else {
      return this._findHelper(node.right, value);
    }
  }

  // Level-order traversal
  levelOrder(callback) {
    if (!callback) throw new Error('Callback function is required');

    const queue = [this.root];
    while (queue.length > 0) {
      const current = queue.shift();
      callback(current);

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
  }

  // In-order traversal
  inOrder(callback) {
    if (!callback) throw new Error('Callback function is required');
    this._inOrderHelper(this.root, callback);
  }

  _inOrderHelper(node, callback) {
    if (node === null) return;

    this._inOrderHelper(node.left, callback);
    callback(node);
    this._inOrderHelper(node.right, callback);
  }

  // Pre-order traversal
  preOrder(callback) {
    if (!callback) throw new Error('Callback function is required');
    this._preOrderHelper(this.root, callback);
  }

  _preOrderHelper(node, callback) {
    if (node === null) return;

    callback(node);
    this._preOrderHelper(node.left, callback);
    this._preOrderHelper(node.right, callback);
  }

  // Post-order traversal
  postOrder(callback) {
    if (!callback) throw new Error('Callback function is required');
    this._postOrderHelper(this.root, callback);
  }

  _postOrderHelper(node, callback) {
    if (node === null) return;

    this._postOrderHelper(node.left, callback);
    this._postOrderHelper(node.right, callback);
    callback(node);
  }

  // Height of node
  height(value) {
    const node = this.find(value);
    if (!node) return null;
    return this._heightHelper(node);
  }

  _heightHelper(node) {
    if (node === null) return -1;

    const leftHeight = this._heightHelper(node.left);
    const rightHeight = this._heightHelper(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  // Depth of node
  depth(value) {
    return this._depthHelper(this.root, value, 0);
  }

  _depthHelper(node, value, currentDepth) {
    if (node === null) return null;
    if (node.data === value) return currentDepth;

    if (value < node.data) {
      return this._depthHelper(node.left, value, currentDepth + 1);
    } else {
      return this._depthHelper(node.right, value, currentDepth + 1);
    }
  }

  // Check if tree is balanced
  isBalanced() {
    return this._isBalancedHelper(this.root) !== -1;
  }

  _isBalancedHelper(node) {
    if (node === null) return 0;

    const leftHeight = this._isBalancedHelper(node.left);
    if (leftHeight === -1) return -1;

    const rightHeight = this._isBalancedHelper(node.right);
    if (rightHeight === -1) return -1;

    if (Math.abs(leftHeight - rightHeight) > 1) return -1;

    return Math.max(leftHeight, rightHeight) + 1;
  }

  // Rebalance tree
  rebalance() {
    const elements = [];
    this.inOrder(node => elements.push(node.data));
    this.root = this.buildTree(elements);
  }
}

// Pretty print function
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

module.exports = { Tree, prettyPrint };
