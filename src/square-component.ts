import { BarboolComponent } from "../framework/core/components/barbool-component";
import { ViewComponent } from "../framework/core/decorators/view/view-component";
import { Colors } from "../framework/core/view/html/colors/Colors";
import { TagManager } from "../framework/core/view/html/tag-manager";
import { Button } from "../framework/core/view/html/view-elements/button";
import { Center } from "../framework/core/view/html/view-elements/center";
import { Column } from "../framework/core/view/html/view-elements/column";
import { Container } from "../framework/core/view/html/view-elements/container";
import { Expanded } from "../framework/core/view/html/view-elements/expanded";
import { ListViewListenerBuilder } from "../framework/core/view/html/view-elements/listview-listener-builder";
import { StateListenerBuilder } from "../framework/core/view/html/view-elements/state-listener-builder";
import { Text } from "../framework/core/view/html/view-elements/text";
import { SquareStateManager } from "./square-state-manager";


@ViewComponent({
  "id": "square",
  "stateManager": SquareStateManager
})
export class SquareComponent extends BarboolComponent {
  
  public onConstruct(element: TagManager) {
    element.css({
      "width": "300px",
      "height": "600px"
    });
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
          flex: 1
        }),
        new Expanded({
          child: new Container({
            color: Colors.cyan,
            child: new Center({
              child: new Button({
                css: 'btn btn-success',
                child: new Text('button'),
                onPressed: () => {
                  console.log("before click");
                  state.wtfButton();
                }
              })
            })
          }),
          flex: 1
        }),
        new Expanded({
          child: new Container({
            color: Colors.blue,
            child: new StateListenerBuilder({
              stream: "characters",
              manager: state,
              inprogress: () => new Text("mientras execute!"),
              init: new Text('Initial text'),
              builder: (data: any) => {
                console.log('annnie', data);
                return new Text(`when data llega: ${data.length}`);
              }
            }),
          }),
          flex: 2
        }),
        new Expanded({
          child: new Container({
            color: Colors.amber,
            child: new ListViewListenerBuilder({
              stream: "characters",
              manager: state,
              inprogress: () => new Text("list view inprogress !"),
              init: new Center({ child: new Text('Initial text') }),
              builder: (data: any, index: number) => {
                return new Container({
                  color: Colors.rosadito,
                  child: new Text(`ls data llega: ${data.name}`)
                });
              }
            }),
          }),
          flex: 3
        })
      ]
    });
  }
}