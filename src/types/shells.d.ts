

type RootedComponentShell<TRoot, TVm, TProps extends NoReactProps> = (stateTools: IStateTools<TRoot, TVm>) => ReactComponent<TProps>

type ComponentShell<TVm, TProps extends NoReactProps> = <TRoot>(stateTools: IStateTools<TRoot, TVm>) => ReactComponent<TProps>
