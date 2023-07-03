type Selector<TRoot, TLeaf> = (root: TRoot) => TLeaf

type VmSelector<TVm> = <TRoot, TModel>(root: TRoot, model: TModel) => TVm

type SelectorHook = <TRoot, TLeaf>(selector: Selector<TRoot, TLeaf>) => TLeaf

type ViewShell<TLeaf, TProps> = <TRoot>(selector: Selector<TRoot, TLeaf>) => (props: TProps) => JSX.Element

type AnyRootedViewShell<TLeaf, TProps> = (selector: Selector<any, TLeaf>) => (props: TProps) => JSX.Element

type ComponentShell<TLeaf, TProps> = (hook: SelectorHook) => ViewShell<TLeaf, TProps>

