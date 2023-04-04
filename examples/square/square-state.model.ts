import { StateModel } from "../../../framework/bomburjs/view/state/StateModel";
import { ProjectModel } from "./project.model";

type SquareStateModelType = {
  list: ProjectModel[];
};

export class SquareStateModel implements StateModel {
  constructor(data: SquareStateModelType) {
    
  }
}