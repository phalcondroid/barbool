import { TagManager } from "../../view/html/tag-manager";

export interface HtmlComponent {
  element?: HTMLElement
}

export function OldComponent(params: any) {
  return function <T extends { new(...args: any[]): {} }>(constructor: T) {
      return class extends constructor {
        element = document.getElementById(params.id);
        event = () => {}
      }
  }
}

export function ViewComponent(params: any) {

  return function <T extends { new(...constructorArgs: any[]): {} }>(constructorFunction: T) {
      const newConstructorFunction: any = function (...args: any) {
          const func: any = function () {
              return new constructorFunction(...args);
          }
          func.prototype = constructorFunction.prototype;
          const element = document.getElementById(params.id);
          const tag = new TagManager(element);
          func.prototype.onConstruct(tag)
          const stateManager = (new params.stateManager())
          tag.append(func.prototype.render(stateManager).render());
          const result: any = new func();
          return result;
      }
      newConstructorFunction.prototype = constructorFunction.prototype;
      return newConstructorFunction;
  }
}

export function Click() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    let originalMethod = descriptor.value;
    //wrapping the original method
    descriptor.value = function (...args: any[]) {
        console.log("wrapped function: before invoking " + propertyKey);
        var result;
        target.element.addEventListener("click", () => {
            result = originalMethod.apply(this, args);
        })
        console.log("wrapped function: after invoking " + propertyKey);
        return result;
    }
  }
}