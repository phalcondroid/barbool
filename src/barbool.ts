import { Barbool } from "../framework/core/barbool";
import { SquareComponent } from "./square-component";

new Barbool({
    modules: [
        SquareComponent
    ]
}).start();