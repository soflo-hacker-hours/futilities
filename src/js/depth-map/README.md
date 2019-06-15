
## Depth Mapping

For a given tree, I needed to know exactly how many parent nodes existed for each node in the tree (i.e. it's depth).
I felt like this was a fun little solution, as it's fairly close to O(n).

My original implementation used a virtualized tree, represented as a flat array. I'm not going to turn it into a real
tree just for this demo. You can do it yourself if you want.

#### usage

````
# start node repl
node

# import
const depthMap = require('./src/js/depth-map')

# run with mock data
depthMap([ {id: 'a', parentId: null}, {id: 'b', parentId: 'a'}, {id: 'c', parentId: 'a'}, {id: 'd', parentId: 'c'}, {id: 'e', parentId: 'd'} ])

# expected output
{ a: 0, b: 1, c: 1, d: 2, e: 3 }
````
