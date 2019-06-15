
/**
 * For a given tree, return a mapping of each node's ID to it's relative depth in the tree.
 *
 * @param {array} tree - A flat array representation of a tree, assuming "id" and "parentId" attributes for node identification
 *
 * @return {object} A map, where key == node ID, and value == position depth (distance to root in parent nodes)
 *
 */

module.exports = tree => {
  const depthMap = {}
  const nestingTracker = []

  tree.forEach(node => {
    if (!nestingTracker.length) {
      nestingTracker.push(node.id)
      depthMap[node.id] = 0
      return
    }

    if (node.parentId === nestingTracker[0] && nestingTracker.length > 1) {
      nestingTracker.splice(1)
    }

    if (nestingTracker.indexOf(node.parentId) === -1) {
      nestingTracker.push(node.parentId)
    }

    depthMap[node.id] = nestingTracker.length
  })

  return depthMap
}
