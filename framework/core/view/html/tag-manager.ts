import { ElementWrapper } from './element-wrapper';

export class TagManager {

  private element: ElementWrapper;
  private deny = ["Table", "Td", "Div", "Thead", "Tbody", "Tfoot", "Tr", "Td", "Th", "Label", "Span", "I", "A"];

  public constructor(element: any) {
    this.element = new ElementWrapper(element);
  }

  /**
   * 
   * @param { string | { [style: string]: string } } styles
   * @param value 
   * @returns 
   */
  public css(styles: string | { [style: string]: string }, value : string | null = null): TagManager {
    const element = this.element.getElement();
    let elementStyle: any = element.style;
    switch (typeof styles) {
      case 'object':
        for (const key in styles) { elementStyle[key] = styles[key];}
      break;
      case 'string':
        if (value === null) return elementStyle[styles];
        elementStyle[styles] = value;
      break;
      default:
    }
    return this;
  }

  /**
   *
   * @param  html [description]
   * @return
   */
  public html(html: any = null)
  {
      if (html != null) {
          this.removeChildNodes();
          this.append(html);
          return this;
      } else {
        return this.element.getElement().innerHTML;
      }
  }

  public verifyElement(elementToAppend: any, type : string = "append")
  {
      if (this.element instanceof HTMLCollection) {
          for (let key in this.element) {
              if (typeof this.element[key].nodeType != "undefined") {
                  if (this.element[key].nodeType == 1) {
                      this.element[key].appendChild(elementToAppend);
                  }
              }
          }
      } else {
          this.element.getElement().appendChild(elementToAppend);
      }
  }

  private checkAppendValue(elementToAppend: any)
  {
      switch (typeof elementToAppend) {
        case "string":
                this.element.getElement().appendChild(
                    document.createTextNode(elementToAppend)
                );
            break;
        case "number":
          this.element.getElement().appendChild(
                    document.createTextNode(
                      elementToAppend.toString()
                    )
                );
            break;
        case "object":
                if (typeof elementToAppend !== "undefined") {
                    this.verifyElement(elementToAppend.getElement());
                } else {
                    this.verifyElement(elementToAppend);
                }
            break;
        default:
      }
  }



  /**
   * Append elements
   * @param value append
   * @return this
   */
  public append(append: any)
  {
    if (Array.isArray(append) || (append instanceof HTMLCollection)) {
        for (let key in append) {
            this.checkAppendValue(append[key]);
        }
    } else {
        this.checkAppendValue(append);
    }
    return this;
  }

  /**
   * 
   * @returns 
   */
  private removeChildNodes() {
    const nativeElement = this.element.getElement(); 
    if (nativeElement instanceof HTMLCollection) {
      for (let key in nativeElement)
        this.removeChilds(nativeElement[key], nativeElement[key].childNodes);
    }
    this.removeChilds(nativeElement, nativeElement.childNodes);
    return this;
  }

  /**
   * 
   * @param element 
   * @param childs 
   */
  private removeChilds(element: any, childs: any)
  {
      while (element.firstChild) {
          element.removeChild(
              element.firstChild
          );
      }
  }

  /**
   * Get attribute or assigne of an element
   * @param attr 
   * @param value 
   * @returns 
   */
  public attr(attr: any, value : any = false)
  {
    if (typeof attr == "object" && value == false) {
      for (let key in attr) {
        this.element.getElement().setAttribute(key, attr[key]);
      }
    } else if (typeof attr == "string" && value != false) {
      this.element.getElement().setAttribute(attr, value);
    } else if (typeof attr == "string" && value == false) {
        return this.element.getElement().getAttribute(attr);
    }
    return this;
  }

  /**
   * Get text 
   * @param text 
   * @returns 
   */
  public getText(text: any = false) {
    if (text) {
      this.element.getElement().innerHTML = text;
        return this;
    } else {
        return this.element.getElement().innerHTML;
    }
  }

  /**
   * Clean all object
   */
  public empty()
  {
      this.removeChildNodes();
      return this;
  }

  /**
   * 
   * @param {string} val 
   * @returns 
   */
  public val(val: any = false) {
    if (val || typeof val === "string") {
      this.attr("value", val);
      return this;
    }
    return this.attr('value');
  }
  
  /**
   * Set class 
   * @param  {string} attrClass 
   * @return {this}  [description]
   */
  public class(attrClass: string): this
  {
    this.element.getElement().setAttribute("class", attrClass);
      return this;
  }

  /**
   * 
   * @param attrClass 
   * @returns 
   */
  public addClass(attrClass : string) {
    let strClass = this.element.getElement().getAttribute("class");
    strClass += " " + attrClass;
    this.element.getElement().setAttribute("class", strClass ?? '');
    return this;
  }

  /**
   * 
   * @param text 
   * @returns 
   */
  public text(text: any = false): this | string {
    if (text) {
      this.element.getElement().innerHTML = text;
      return this;
    }
    return this.element.getElement().innerHTML;
  }

  /**
   * 
   * @param html 
   * @returns 
   */
  public setInnerHtml(html: any) {
    this.element.getElement().innerHTML = html;
    return this;
  }

  /**
   *
   *
   */
  public getChilds() {
    let childNodes = this.element.getElement().childNodes;
    let childs: TagManager[] = [];
    for (let key in childNodes) {
      if (childNodes[key].nodeType == 1) {
        let tagObject = new TagManager(childNodes);
        childs.push(tagObject);
      }
    }
    return childs;
  }

  /**
   * 
   * @param element 
   * @returns 
   */
  public remove(element: Node | null = null) {
    if (element instanceof Node) {
      this.element.getElement().removeChild(element);
      return this;
    }
    const parent = this.element.getElement().parentElement;
    if (parent instanceof Node) {
      parent.removeChild(this.element.getElement());
    }
    return this;
  }

  public getSiblings() {
    let siblings: TagManager[] = [];
    if (siblings.length > 0) {
        let aux = new Array;
        for (let item of siblings) {
            if (item.getElement() != this.element.getElement()) {
                aux.push(item);
            }
        }
        return aux;
    }
    return false;
  }

  public getParent(): TagManager | null {
    const parent = this.element.getElement().parentElement;
    if (parent && parent.nodeType == 1) {
      return new TagManager(parent);
    }
    return null;
  }

  /**
   * 
   * @returns 
   */
  public getElement() {
    return this.element.getElement();
  }
}