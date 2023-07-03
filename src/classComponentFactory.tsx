import { ComponentFactory } from "./componentFactory";

export type ClassFactories<TRoot, TModel> = {
  [Key in keyof TModel]: IComponentFactory<TRoot, TModel[Key]>
}

export interface IClassComponentFactory<TRoot, TModel> extends IComponentFactory<TRoot, TModel> {
  factories: ClassFactories<TRoot, TModel>
}

export class ClassComponentFactory<TRoot, TModel> implements IComponentFactory<TRoot, TModel> {
  constructor(factories: ClassFactories<TRoot, TModel>) {
    this.factories = factories;
  }
  protected factories: ClassFactories<TRoot, TModel>
  createComponent(selector: Selector<TRoot, TModel>) {
    const properties: JSX.Element[] = [];
    for (const key in this.factories) {
      const Property = this.factories[key].createComponent(root => selector(root)[key]);
      properties.push(<Property key={key} />)
    }
    return function ClassComponent() {
      return <>{properties}</>;
    }
  }
}
