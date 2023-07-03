

export function componentFactory(stateHook: SelectorHook) {
  return function<TVm, TProps>(componentShell: ComponentShell<TVm, TProps>) {
    return function <TRoot, TModel>(vmSelector: (root: TRoot, model: TModel) => TVm) {
      return function (modelSelector: Selector<TRoot, TModel>) {
        return componentShell(stateHook)((root: TRoot) => vmSelector(root, modelSelector(root)))
      }
    }
  }
}
