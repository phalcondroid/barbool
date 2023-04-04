import { ElementWrapper } from './ElementWrapper';

export class ArrayHelper {
  /**
   * Search html elements in a list if exist
   * @param container HTMLElement[]
   * @param element HTMLelement
   * @returns 
   */
  public static elementsInArray(container : any[], element : any)
  {
    for (let key in container) {
        if (container[key] == element) {
            return true;
        }
    }
    return false;
  }
}

export class TagManager {

  private element: ElementWrapper;
  private deny = ["Table", "Td", "Div", "Thead", "Tbody", "Tfoot", "Tr", "Td", "Th", "Label", "Span", "I", "A"];

  public constructor(element: any) {
    this.element = new ElementWrapper(element);
  }

  /**
   * 
   * @returns 
   */
  public getElementWrapped(): ElementWrapper {
    return this.element;
  }

  /**
   * 
   * @param css 
   * @param value 
   * @returns 
   */
  public css(css: any, value : any = null): TagManager {
    if (typeof css == "object") {
      for (let key in css) {
        this.element.getElement().style[key] = css[key];
      }
    } else if (typeof css == "string" && value != null) {
      this.element.getElement().style[css] = value;
    } else if (typeof css == "string" && value == null) {
      return this.element.getElement().style[css];
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

  getElement() {
    return this.element.getElement();
  }

  private removeChildNodes()
  {
      if (this.element.getElement() instanceof HTMLCollection) {
          for (let key in this.element.getElement()) {
              this.removeChilds(
                  this.element.getElement()[key],
                  this.element.getElement()[key].childNodes
              );
          }
      } else {
          this.removeChilds(
              this.element.getElement(),
              this.element.getElement().childNodes
          );
      }
  }

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
   * Get val as int
   * @returns number
   */
  public getValAsInt()
  {
      return parseInt(this.val());
  }

  /**
   * Get text 
   * @param text 
   * @returns 
   */
  public getText(text: any = false) {
    if (text) {
      this.element.getElement().innerHtml = text;
        return this;
    } else {
        return this.element.getElement().innerHtml;
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

  public val(val: any = false)
  {
      if (val || typeof val == "string") {
        this.element.getElement().value = val;
          this.attr("value", val);
          return this;
      } else {
          return this.element.getElement().value;
      }
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
    */
   public addClass(attrClass : string)
   {
       let strClass = this.element.getElement().getAttribute("class");
       strClass += " " + attrClass;
       this.element.getElement().setAttribute("class", strClass);
       return this;
   }

  public text(text: any = false): this | string {
  if (text) {
      this.element.getElement().innerHtml = text;
      return this;
    } else {
        return this.element.getElement().innerHtml;
    }
  }

   /**
    * Set inner html throught
    */
   public setInnerHtml(html: any)
   {
       this.element.getElement().innerHTML = html;
       return this.element;
   }

  /**
   *
   *
   */
  public getChilds() {
    let childNodes = this.element.getElement().childNodes;
    let childs = [];
    for (let key in childNodes) {
      if (childNodes[key].nodeType == 1) {
        let tagObject = new TagManager(childNodes);
        childs.push(tagObject);
      }
    }
    return childs;
  }

  public remove(element = false) {
    if (element) {
      this.element.getElement().removeChild(
        element
      );
    } else {
      this.element.getElement().parentElement.removeChild(
        this.element.getElement()
      );
    }
  }

  public getSiblings()
  {
    let siblings: any = [];
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

  public getParent(): TagManager | boolean {
    let parent = this.element.getElement().parentElement;
    if (parent.nodeType == 1) {
      let tagObject = new TagManager(parent);
        return tagObject;
    }
    return false;
  }

  /**
   *
   */
  public getAsObject() : any[] {
    let childs = this.element.getElement().childNodes;
    let obj    = new Array();

    if (childs instanceof NodeList) {
      for (let key in childs) {
          if (typeof childs[key].nodeType != "undefined") {
            switch (childs[key].nodeType) {
              case Node.ELEMENT_NODE:
                  let auxElement = new TagManager(new ElementWrapper(childs[key]));
                  let finalObj  = {};
                  let auxObject = auxElement.getAsObject();
                  //finalObj[auxElement.getClassName().toLowerCase()] = auxObject;
                  if (auxObject.length > 0) {
                      obj.push(finalObj);
                  }
                break;
              case Node.TEXT_NODE:
                obj.push(
                    childs[key].nodeValue
                );
              break;
            }
          }
      }
    }
    return obj;
  }

  public getAsJson()
  {
    let objects = this.getAsObject();
    return JSON.stringify(
        objects
    );
  }

  public click(event: Function) {
    this.getElement().addEventListener('click', event);
    return this;
  }
}