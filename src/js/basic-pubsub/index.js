
import _ from 'lodash'

const eventService = {

  // List of "topics" - messaging queues that a function can subscribe to.
  topics: [],

  // A simple utility function for generating a random set of characters. We need this for the topic ID.
  hashString() {
    let length = 8
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

    if (! length) {
        length = Math.floor(Math.random() * chars.length);
    }

    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  },

  // Retrieve a topic by its ID.
  getTopic(topicId) {
    return _.find(this.topics, {id: topicId}) || null
  },

  // Subscribe to a function, similar to jQuery's ".on()" method.
  on(topicId, callback, refId) {
    refId = refId || this.hashString()
    let topic = this.getTopic(topicId)

    if (!topic) {
      topic = {
        id: topicId,
        queue: [{
          refId: refId || null,
          callback: callback
        }]
      }

      this.topics.push(topic)
    } else {
      topic.queue.push({
        refId: refId || null,
        callback: callback
      })
    }

    return refId
  },

  // Unsubscribe to a topic.
  off(topicId, refId) {
    if (!refId) {
      return
    }

    let topic = this.getTopic(topicId)

    if (!topic) {
      return
    }

    topic.queue = _.filter(topic.queue, (entry) => {
      return entry.refId !== refId
    })
  },

  /**
   * Sends a message.
   *
   * Param topicId (string): The ID of the topic.
   * Param args (arguments): The arguments to pass to the message.
   */
  trigger() {
    let args = Array.prototype.slice.call(arguments)
    let topicId = args.shift()

    let topic = _.find(this.topics, {id: topicId})

    if (!topic || !topic.queue || !topic.queue.length) {
      return
    }

    _.map(topic.queue, (entry) => {
      if (entry.callback && (typeof entry.callback === 'function')) {
        entry.callback.apply(null, args)
      }
    })
  }

}

export default eventService
