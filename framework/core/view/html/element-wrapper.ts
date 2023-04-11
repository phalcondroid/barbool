export class ElementWrapper {
  
  private element: HTMLElement;

  public constructor(name: any) {
    if (name instanceof HTMLElement) {
      this.element = name;
      return this
    } else if (typeof name.target != "undefined") {
      this.element = name.target;
      return this
    } else if (typeof name == "string") {
      this.element = this.convertToElement(name);
      return this
    } else {
      this.element = this.convertToElement(this.getNameOfClass(name));
    }
    return this;
  }

  /**
   * Create html component
   *
   * @param  {string} element [description]
   * @param  {string} name    [description]
   * @return ViewElement
   */
  private convertToElement(nameOfClass: any): HTMLElement {
    if (nameOfClass instanceof HTMLElement) {
      return nameOfClass;
    }
    let docElement = document.createElement(nameOfClass);
    if (nameOfClass === "Button") {
      docElement.setAttribute("type", "button");
    }
    return docElement;
  }

  /**
   * Get class name, thats mean the name of constructor of any class passed as param  
   * @param cls Object class to check name
   * @return string
   */
  public getNameOfClass(cls: any): string {
    let funcNameRegex = /function (.{1,})\(/;
    let results  = (funcNameRegex).exec(cls["constructor"].toString());
    return (results && results.length > 1) ? results[1] : "";
  }
  
  /**
   * Get dom element
   * @returns HTMLElement
   */
  public getElement(): HTMLElement {
    return this.element;
  }
}