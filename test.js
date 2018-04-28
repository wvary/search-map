const fs = require('fs');

function readData() {
  const words = fs.readFileSync('./words.txt', 'utf8');
  return words.split('\n');
}

function mapWord(word, node) {
  const c = word[0];
  node[c] = node[c] || {};
  if (word.length === 1) {
    node[c]['-1'] = -1;
  } else {
    mapWord(word.substr(1), node[c])
  }
}

function mapData(data, tree) {
  data.forEach(i => {
    mapWord(i, tree);
  });
}

function getWord(word, node, c, list) {
  if (node['-1']) {
    list.push(word + c);
  }
  for(let k in node) {
    if (k !== '-1') {
      getWord(word + c, node[k], k, list);
    }
  }
}

function walkNode(word, node) {
  const c = word[0];
  if (word === '') {
    return node;
  } else if (node[c]) {
    return walkNode(word.substr(1), node[c]);
  }
}

function findWords(word) {
  const node = walkNode(word, tree);
  const list = [];
  getWord(word, node, '', list);
  return list;
}



const data = readData();
const tree = {};

console.log('Words count: ', data.length);

console.time('mapData elapsed time');
mapData(data, tree)
console.timeEnd('mapData elapsed time');

console.time('findWord elapsed time');
const result = findWords('apple');
console.timeEnd('findWord elapsed time')

console.log('Words found: ', result);