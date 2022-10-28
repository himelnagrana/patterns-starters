// TODO: text editor should support undo
// 1. not allwed to keep history
// 2. not allowed to expose private content property

class Publisher<T> {
  private subscribers: Set<Subscriber<T>>;
  private state: T;

  constructor() {
    this.subscribers = new Set();
  }

  subscribe(subscriber: Subscriber<T>) {
    this.subscribers.add(subscriber);
  }

  unsubscribe(subscriber: Subscriber<T>) {
    this.subscribers.delete(subscriber);
  }

  publish(state: T) {
    this.subscribers.forEach(s => s.update(state));
  }
}

interface Subscriber<T> {
  update(state: T): void;
}

interface TextEditorAction {
  content: string;
  action: string;
}

class TextEditor extends Publisher {
  private _content: string = "";

  constructor() {
    super();
  }

  addContent(newContent: string) {
    this._content += " " + newContent;
    this.publish({ content: newContent, action: 'insert' });
  }

  highlight(word: string) {
    this._content = this._content.split(word).join(`<b>${word}</b>`);
    this.publish({ content: word, action: 'highlight' });
  }

  undo() {
    this.publish({ content: '', action: 'undo' });
  }

  render() {
    console.log(this._content);
  }
}

class Clipboard extends Subscriber<TextEditorAction> {
  public history: Array<T> = [];

  push(content: any) {
    history.push(content);
  }

  pop(): Array<T> {
    history.pop();
    return history;
  }

  update() {

  }
}

const editor = new TextEditor();

editor.addContent("some content");
editor.render();

editor.addContent("some more content");
editor.render();

editor.highlight("some");
editor.render();
