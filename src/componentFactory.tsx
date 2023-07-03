

export class StateFactory {
  constructor(stateHook: SelectorHook) {
    this.stateHook = stateHook
  }
  protected stateHook: SelectorHook
  createViewFactory<TVm, TProps>(componentShell: Wayang<TVm, TProps>) {
    return new ViewFactory<TVm, TProps>(this.stateHook, componentShell);
  }
}

export class ViewFactory<TVm, TProps> {
  constructor(stateHook: SelectorHook, componentShell: Wayang<TVm, TProps>) {
    this.stateHook = stateHook
    this.componentShell = componentShell;
  }
  protected stateHook: SelectorHook
  protected componentShell: Wayang<TVm, TProps>
  createComponentFactory<TRoot, TModel>(vmSelector: VmSelector<TVm, TRoot, TModel>) {
    return new ComponentFactory<TRoot, TModel, TVm, TProps>(this.stateHook, this.componentShell, vmSelector);
  }
}

export class ComponentFactory<TRoot, TModel, TVm, TProps> implements IComponentFactory<TRoot, TModel> {
  constructor(stateHook: SelectorHook, componentShell: Wayang<TVm, TProps>, vmSelector: VmSelector<TVm, TRoot, TModel>) {
    this.stateHook = stateHook
    this.componentShell = componentShell;
    this.vmSelector = vmSelector;
  }
  protected stateHook: SelectorHook
  protected componentShell: Wayang<TVm, TProps>
  protected vmSelector: VmSelector<TVm, TRoot, TModel>
  createComponent(modelSelector: Selector<TRoot, TModel>) {
    return this.componentShell({
      stateHook: this.stateHook, 
      selector: (root: TRoot) => this.vmSelector(root, modelSelector(root))
    });
  }
}
