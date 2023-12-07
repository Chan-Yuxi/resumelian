export type Parser = (
  queue: HTMLCollection,
  child: Element,
  index: number
) => [Element | null, number];

export class Resolver {
  private queue: HTMLCollection;
  private index: number;
  private parserQueue: Parser[];

  constructor(queue: HTMLCollection) {
    this.queue = queue;
    this.index = 0;
    this.parserQueue = [((_, child) => [child, 1]) as Parser];
  }

  next(): Element | null {
    if (this.index >= this.queue.length) {
      return null;
    }
    const child = this.queue[this.index];
    for (const parser of this.parserQueue) {
      const [result, span] = parser(this.queue, child, this.index);
      if (result) {
        this.index += span;
        return result;
      }
    }
    return null;
  }

  register(parser: Parser) {
    this.parserQueue.unshift(parser);
  }
}
