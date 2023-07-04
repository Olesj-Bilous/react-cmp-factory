

interface IComponentFactory<TRoot, TModel, TProps extends NoReactProps> {
  createComponent(selector: Selector<TRoot, TModel>): ReactComponent<TProps>
}

type ClassFactories<TRoot, TVm> = {
  [Key in keyof TVm]: IComponentFactory<TRoot, TVm[Key], NoReactProps>
}

type ConditionalFactories<TRoot, TModel> = {
  [key: string]: IComponentFactory<TRoot, TModel, NoReactProps>
}

interface ConditionalVm<TModel, TConditions> {
  condition: keyof TConditions
  model: TModel
}
