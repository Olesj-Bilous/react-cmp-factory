

export class StateFactory {
  constructor(stateHook: SelectorHook) {
    this.stateHook = stateHook
  }
  protected stateHook: SelectorHook
  createViewFactory<TVm, TProps extends NoReactProps>(componentShell: ComponentShell<TVm, TProps>) {
    return new ViewFactory<TVm, TProps>(this.stateHook, componentShell);
  }
  createRootedViewFactory<TRoot, TVm, TProps extends NoReactProps>(componentShell: RootedComponentShell<TRoot, TVm, TProps>) {
    return new RootedViewFactory<TRoot, TVm, TProps>(this.stateHook, componentShell);
  }
}

export class ViewFactory<TVm, TProps extends NoReactProps> {
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

export class RootedViewFactory<TRoot, TVm, TProps extends NoReactProps> {
  constructor(stateHook: SelectorHook, componentShell: RootedComponentShell<TRoot, TVm, TProps>) {
    this.stateHook = stateHook
    this.componentShell = componentShell;
  }
  protected stateHook: SelectorHook
  protected componentShell: RootedComponentShell<TRoot, TVm, TProps>
  createComponentFactory<TModel>(vmSelector: VmSelector<TVm, TRoot, TModel>) {
    return new ComponentFactory<TRoot, TModel, TVm, TProps>(this.stateHook, this.componentShell, vmSelector);
  }
}

export class ComponentFactory<TRoot, TModel, TVm, TProps extends NoReactProps> implements IComponentFactory<TRoot, TModel, TProps> {
  constructor(stateHook: SelectorHook, componentShell: RootedComponentShell<TRoot, TVm, TProps>, vmSelector: VmSelector<TVm, TRoot, TModel>) {
    this.stateHook = stateHook
    this.componentShell = componentShell;
    this.vmSelector = vmSelector;
  }
  protected stateHook: SelectorHook
  protected componentShell: RootedComponentShell<TRoot, TVm, TProps>
  protected vmSelector: VmSelector<TVm, TRoot, TModel>
  createComponent(modelSelector: Selector<TRoot, TModel>) {
    return this.componentShell({
      stateHook: this.stateHook, 
      selector: (root: TRoot) => this.vmSelector(root, modelSelector(root))
    });
  }
}
