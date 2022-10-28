// todo: text editor should support undo
// 1. not allwed to keep history
// 2. not allowed to expose private content property

// ---------------------------------------------------------------------------
interface Memento {
  getContent(): any
}

interface Originator {
  save(): Memento;
  restore(memento: Memento): void;
}

class CareTaker {
  private mementos: Array<Memento>;
  private originator: Originator;

  constructor(originator: Originator) {
    this.originator = originator;
    this.mementos = [];
  }

  backup() {
    console.log('backing up ... ... ...');
    this.mementos.push(this.originator.save());
  }

  undo(): void {
    if (this.mementos.length <= 0) {
      return;
    }
    console.log('undoing ... ... ...');
    const lastElem = this.mementos.pop();
    this.originator.restore(lastElem!);
  }
}

// ---------------------------------------------------------------------------

class TextEditorMemento implements Memento {
  private readonly content: string;
  private updatedAt: string;

  constructor(content: string) {
    this.content = content;
    this.updatedAt = new Date().toISOString();
  }

  getContent() {
    return this.content;
  }
}

class TextEditor implements Originator {
  private _content: string = "";
  private _editable: boolean;

  addContent(newContent: string) {
    this._content += " " + newContent;
  }

  highlight(word: string) {
    this._content = this._content.split(word).join(`<b>${word}</b>`);
  }

  render() {
    console.log(this._content);
  }

  save() {
    return new TextEditorMemento(this._content);
  }

  restore(memento: Memento) {
    this._content = memento.getContent();
  }
}

const editor = new TextEditor();
const editorCareTaker = new CareTaker(editor);

editor.addContent("some content");
editorCareTaker.backup();
editor.render();

editor.addContent("some more content");
editorCareTaker.backup();
editor.render();

editor.highlight("some");
editorCareTaker.backup();
editor.render();


editorCareTaker.undo();
editor.render();
