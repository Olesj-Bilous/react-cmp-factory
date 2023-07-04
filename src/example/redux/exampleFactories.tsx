import { ConditionalShellFactory } from "../../factories/ConditionalShellFactory";
import { ClassShellFactory } from "../../factories/ClassShellFactory";
import { reduxFactory } from "./reduxFactories";
import { stringViewFactory, editStringViewFactory, editBooleanViewFactory } from "./reduxFactories";

interface ModelState<T> {
  editModel: boolean
  editProperties: Record<keyof T, boolean>
}

interface ModelAnnotations<T> {
  modelTitle: string
  propertyTitles: Record<keyof T, string>
}

interface ViewModel<T> {
  state: ModelState<T>
}

interface Example {
  well: string
  wellWell: string
}

export interface ExampleVm extends Example, ViewModel<Example> {
}

export interface QuickVm extends Example {
  edit: boolean
}

const stringComponentFactory = stringViewFactory.createComponentFactory((root: ExampleVm, model: string) => model);
const editStringFactory = editStringViewFactory.createComponentFactory((root: ExampleVm, model: string) => model);
const editBooleanFactory = editBooleanViewFactory.createComponentFactory((root: ExampleVm, model: boolean) => model)

const conditionalFactories : ConditionalFactories<ExampleVm, string> = {
  read: stringComponentFactory,
  edit: editStringFactory
}

const conditionalStringShellFactory = new ConditionalShellFactory(conditionalFactories)

const conditionalStringFactory = reduxFactory.createRootedViewFactory(conditionalStringShellFactory.createShell())
  .createComponentFactory((root: ExampleVm, model: string) => ({
     // !
    condition: root.state.editProperties.well ? 'edit' : 'read', // !
     // !
    model
  }))

const displayShellFactory = new ClassShellFactory<ExampleVm, { value: string, edit: boolean }>({
  value: conditionalStringFactory, // !
  edit: editBooleanFactory
})

const displayComponentFactory = reduxFactory.createRootedViewFactory(displayShellFactory.createShell())
  .createComponentFactory((root, model: string) => ({
    value: model,
     // !
    edit: root.state.editProperties.well // !
     // !
  }))

const exampleShellFactory = new ClassShellFactory<ExampleVm, QuickVm>({
  well: displayComponentFactory, // !
  wellWell: conditionalStringFactory, // !
  edit: editBooleanFactory
})

export const Example = reduxFactory.createRootedViewFactory(exampleShellFactory.createShell())
  .createComponentFactory((root, model: ExampleVm) => ({
    well: model.well,
    wellWell: model.wellWell,
    edit: model.state.editModel
  })).createComponent(root => root);
