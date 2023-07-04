

export class ConditionalShellFactory<TRoot, TModel> {
  constructor(factories: ConditionalFactories<TRoot, TModel>) {
    this.factories = factories;
  }
  factories: ConditionalFactories<TRoot, TModel>

  createShell() {
    return (stateTools: IStateTools<TRoot, ConditionalVm<TModel, ConditionalFactories<TRoot, TModel>>>) =>
    {
      let components: { [Key in keyof ConditionalFactories<TRoot, TModel>]?: DefaultReactComponent } = {};
      for (const key in this.factories) {
        components[key] = this.factories[key].createComponent(
          (root: TRoot) => stateTools.selector(root).model
        );
      }
      return function ConditionalComponent() {
        const condition = stateTools.stateHook(
          (root: TRoot) => stateTools.selector(root).condition
        );
        const Component = components[condition];
        return <>{ Component && <Component /> }</>
      }
    }
  }
}
