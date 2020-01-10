/*
Copyright 2019 Daniel Vaughn

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

Contributors
2020 Bryan Bonvallet
*/

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
    return this.topics.find(e => e.id === topicId) || null
  },

  // Subscribe to a function, similar to jQuery's ".on()" method.
  on(topicId, callback, refId) {
    refId = refId || this.hashString()
    let topic = this.getTopic(topicId)

    let to_queue = {
      refId: refId || null,
      callback: callback
    };

    if (!topic) {
      topic = {
        id: topicId,
        queue: [to_queue]
      }

      this.topics.push(topic)
    } else {
      topic.queue.push(to_queue);
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

    topic.queue = topic.queue.filter(entry => entry.refId !== refId);
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

    let topic = this.getTopic(topicId);

    if (!topic || !topic.queue || !topic.queue.length) {
      return
    }

    topic.queue.forEach(entry => {
      if (entry.callback && (typeof entry.callback === 'function')) {
        entry.callback.apply(null, args);
      }
    })
  }

}

export default eventService
