type Selector<TRoot, TLeaf> = (root: TRoot) => TLeaf

type VmSelector<TVm, TRoot, TModel> = (root: TRoot, model: TModel) => TVm

type SelectorHook = <TRoot, TLeaf>(selector: Selector<TRoot, TLeaf>) => TLeaf

type ViewShell<TLeaf, TProps> = <TRoot>(selector: Selector<TRoot, TLeaf>) => (props: TProps) => JSX.Element

type AnyRootedViewShell<TLeaf, TProps> = (selector: Selector<any, TLeaf>) => (props: TProps) => JSX.Element

type ComponentShell<TLeaf, TProps> = (hook: SelectorHook) => ViewShell<TLeaf, TProps>

interface IComponentFactory<TRoot, TModel> {
  createComponent(selector: Selector<TRoot, TModel>): (props: any) => JSX.Element;
}

interface IStateTools<TRoot, TLeaf> {
  stateHook: SelectorHook,
  selector: Selector<TRoot, TLeaf>
}

type Wayang<TVm, TProps> = <TRoot>(stateTools: IStateTools<TRoot, TVm>) => (props: TProps) => JSX.Element
