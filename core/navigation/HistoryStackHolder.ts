export interface IHistoryStackHolder {
  pop(): string;
  push(screenName: string): void;
  peek(): string;
  clear(): void;
  isEmpty(): boolean;
  size(): number;
}


export const HistoryStackHolder = (() => {
  const history = new WeakMap();

  return class implements IHistoryStackHolder {
    constructor() {
      history.set(this, []);
    }

    push(screenName: string) {
      history.get(this).push(screenName);
    }

    pop() {
      return history.get(this).pop();
    }

    peek() {
      const elements = history.get(this);
      return elements[elements.length -1];
    }

    isEmpty() {
      return history.get(this).length === 0;
    }

    clear() {
      history.get(this).length = 0;
    }

    size () {
      return history.get(this).length;
    }
  };
})();
