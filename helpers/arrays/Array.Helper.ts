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