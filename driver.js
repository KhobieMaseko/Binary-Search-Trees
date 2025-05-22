const { Tree, prettyPrint } = require('./binarySearchTree');

// Generate random array
function generateRandomArray(size = 10, max = 100) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max));
}

// Main driver function
function main() {
  // Create BST from random numbers
  const randomArray = generateRandomArray(15, 100);
  console.log('Original array:', randomArray);
  const bst = new Tree(randomArray);

  // Confirm that the tree is balanced
  console.log('Is balanced:', bst.isBalanced());
  prettyPrint(bst.root);

  // Print elements in various orders
  console.log('Level order:');
  bst.levelOrder(node => process.stdout.write(`${node.data} `));
  console.log('\nPre order:');
  bst.preOrder(node => process.stdout.write(`${node.data} `));
  console.log('\nPost order:');
  bst.postOrder(node => process.stdout.write(`${node.data} `));
  console.log('\nIn order:');
  bst.inOrder(node => process.stdout.write(`${node.data} `));
  console.log();

  // Unbalance the tree
  [150, 120, 180, 200].forEach(num => bst.insert(num));
  console.log('\nAfter adding large numbers:');
  prettyPrint(bst.root);
  console.log('Is balanced:', bst.isBalanced());

  // Rebalance the tree
  bst.rebalance();
  console.log('\nAfter rebalancing:');
  prettyPrint(bst.root);
  console.log('Is balanced:', bst.isBalanced());

  // Print elements again
  console.log('Level order:');
  bst.levelOrder(node => process.stdout.write(`${node.data} `));
  console.log('\nPre order:');
  bst.preOrder(node => process.stdout.write(`${node.data} `));
  console.log('\nPost order:');
  bst.postOrder(node => process.stdout.write(`${node.data} `));
  console.log('\nIn order:');
  bst.inOrder(node => process.stdout.write(`${node.data} `));
  console.log();
}

main();
