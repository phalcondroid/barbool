import { ViewComponent } from "../../../framework/bomburjs/view/ViewComponent";
import { TagManager } from "../../../framework/bomburjs/view/html/TagManager";
import { Button } from "../../../framework/bomburjs/view/html/ViewElements/Button";
import { Center } from "../../../framework/bomburjs/view/html/ViewElements/Center";
import { Column } from "../../../framework/bomburjs/view/html/ViewElements/Column";
import { Container } from "../../../framework/bomburjs/view/html/ViewElements/Container";
import { Expanded } from "../../../framework/bomburjs/view/html/ViewElements/Expanded";
import { StateListenerBuilder } from "../../../framework/bomburjs/view/html/ViewElements/StateListenerBuilder";
import { Text } from "../../../framework/bomburjs/view/html/ViewElements/Text";
import { Colors } from "../../../framework/bomburjs/view/html/ViewElements/colors/Colors";
import { StateManager } from "../../../framework/bomburjs/view/state/StateManager";
import { SquareStateManager } from "./square-state.manager";

@ViewComponent({
  "id": "square",
  "stateManager": SquareStateManager
})
export class SquareComponent {
  
  public onConstruct(selfComponent: TagManager) {
    
  }

  public render(state: SquareStateManager) {
    return new Column({
      children: [
        new Expanded({
          child: new Container({
            color: Colors.indigo,
            child: new Text('Row 1')
          }),
          flex: 1
        }),
        new Expanded({
          child: new Container({
            color: Colors.red,
            child: new Text('Row 2')
          }),
          flex: 3
        }),
        new Expanded({
          child: new Container({
            color: Colors.cyan,
            child: new Center({
              child: new Button({
                child: new Text('wtf button'),
                onPressed: () => {
                  state.wtfButton();
                }
              })
            })
          }),
          flex: 5
        }),
        new Expanded({
          child: new Container({
            child: new StateListenerBuilder({
              listener: "anie",
              manager: state,
              inProgress: new Text("mientras execute!"),
              builder: (data: any) => {
                return new Text(`jajajjajajaja texto ${data}`);
              }
            }),
            color: Colors.amber
          }),
          flex: 1
        })
      ]
    });
  }

  public click(element: HTMLElement) {
    console.log("clicked", element)

    let div = document.createElement("div")
    let p = document.createElement("p")

    p.textContent = "lo cree al hacer el div"
    div.appendChild(p)

    element.appendChild(div);
  }
}