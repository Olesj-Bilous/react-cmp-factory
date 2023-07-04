

export class ClassShellFactory<TRoot, TVm> {
  constructor(factories: ClassFactories<TRoot, TVm>) {
    this.factories = factories;
  }
  protected factories: ClassFactories<TRoot, TVm>
  createShell() {
    return (stateTools: IStateTools<TRoot, TVm>) =>
    {
      const properties: JSX.Element[] = [];
      for (const key in this.factories) {
        const Property = this.factories[key].createComponent(root => stateTools.selector(root)[key]);
        properties.push(<Property key={key} />)
      }
      
      return function ClassComponent() {
        return <>{properties}</>;
      }
    }
  }
}
