import { ConditionalShellFactory } from "../../factories/ConditionalShellFactory";
import { ClassShellFactory } from "../../factories/ClassShellFactory";
import { reduxFactory } from "./reduxFactories";
import { stringViewFactory, editStringViewFactory, editBooleanViewFactory } from "./reduxFactories";

export interface ExampleVm {
  well: string,
  wellWell: string,
  edit: boolean
}

const stringComponentFactory = stringViewFactory.createComponentFactory((root: ExampleVm, model: string) => model);
const editStringFactory = editStringViewFactory.createComponentFactory((root: ExampleVm, model: string) => model);
const editBooleanFactory = editBooleanViewFactory.createComponentFactory((root: ExampleVm, model: boolean) => model)

const conditionalFactories : ConditionalFactories<ExampleVm, string> = {
  read: stringComponentFactory,
  edit: editStringFactory
}

const conditionalStringShellFactory = new ConditionalShellFactory(
  conditionalFactories
)

const conditionalStringFactory = reduxFactory.createRootedViewFactory(conditionalStringShellFactory.createShell())
  .createComponentFactory((root: ExampleVm, model: string) => ({
    condition: root.edit ? 'edit' : 'read',
    model
  }))

const exampleShellFactory = new ClassShellFactory<ExampleVm, ExampleVm>({
  well: stringComponentFactory,
  wellWell: conditionalStringFactory,
  edit: editBooleanFactory
})

export const Example = reduxFactory.createRootedViewFactory(exampleShellFactory.createShell())
  .createComponentFactory((root, model: ExampleVm) => model)
  .createComponent(root => root);
