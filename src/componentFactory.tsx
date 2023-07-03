

export function componentFactory(stateHook: SelectorHook) {
  return function<TVm, TProps>(componentShell: ComponentShell<TVm, TProps>) {
    return function <TRoot, TModel>(vmSelector: VmSelector<TVm, TRoot, TModel>) {
      return function (modelSelector: Selector<TRoot, TModel>) {
        return componentShell(stateHook)((root: TRoot) => vmSelector(root, modelSelector(root)))
      }
    }
  }
}

export class StateFactory {
  constructor(stateHook: SelectorHook) {
    this.stateHook = stateHook
  }
  protected stateHook: SelectorHook
  createViewFactory<TVm, TProps>(componentShell: ComponentShell<TVm, TProps>) {
    return new ViewFactory<TVm, TProps>(this.stateHook, componentShell);
  }
}

export class ViewFactory<TVm, TProps> {
  constructor(stateHook: SelectorHook, componentShell: ComponentShell<TVm, TProps>) {
    this.stateHook = stateHook
    this.componentShell = componentShell;
  }
  protected stateHook: SelectorHook
  protected componentShell: ComponentShell<TVm, TProps>
  createComponentFactory<TRoot, TModel>(vmSelector: VmSelector<TVm, TRoot, TModel>) {
    return new ComponentFactory<TRoot, TModel, TVm, TProps>(this.stateHook, this.componentShell, vmSelector);
  }
}

export class ComponentFactory<TRoot, TModel, TVm, TProps> {
  constructor(stateHook: SelectorHook, componentShell: ComponentShell<TVm, TProps>, vmSelector: VmSelector<TVm, TRoot, TModel>) {
    this.stateHook = stateHook
    this.componentShell = componentShell;
    this.vmSelector = vmSelector;
  }
  protected stateHook: SelectorHook
  protected componentShell: ComponentShell<TVm, TProps>
  protected vmSelector: VmSelector<TVm, TRoot, TModel>
  createComponent(modelSelector: Selector<TRoot, TModel>) {
    return this.componentShell(this.stateHook)((root: TRoot) => this.vmSelector(root, modelSelector(root)));
  }
}
