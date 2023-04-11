import { BarboolComponent } from "./components/barbool-component";

type AppTypes = {
    modules: typeof BarboolComponent[]
}

export class Barbool {
    constructor(
        private params: AppTypes
    ) {}

    start() {
        const modules: any = this.params.modules;
        modules.forEach((component: any) => new component());
    }
}