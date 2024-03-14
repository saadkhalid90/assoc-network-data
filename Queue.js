// @ts-check
// an entry of a dingly linked list. stores a pointer to the next object
/**
 * @typedef {{nodeId: string, depth: number, type: 'assoc'|'entity', linkId?: string, assocRole?: string}} NodeValue
 *
 * @typedef {Object} LinkedListNode
 * @property {NodeValue} value
 * @property {LinkedListNode|null} next
 */

class ListEntry {
  /**
   *
   * @param {NodeValue} value
   */
  constructor(value) {
    this.value = value;
    /**@type {LinkedListNode|null} */
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  /**
   *
   * @param {LinkedListNode} entry
   * @returns {number}
   */
  enqueue(entry) {
    // enqueue an array?
    if (!this.tail) {
      this.head = entry;
      this.tail = entry;
    } else {
      this.tail.next = entry;
      this.tail = entry;
    }
    return ++this.size; // returns the size of the queue
  }
  /**
   *
   * @returns {LinkedListNode|undefined}
   */
  dequeue() {
    if (this.head === null) {
      return undefined;
    } else {
      const oldHead = this.head;
      this.head = this.head.next;
      this.size--;
      if (this.size === 0) {
        this.head = null;
        this.tail = null;
      }
      return oldHead;
    }
  }
}

export { Queue, ListEntry };
