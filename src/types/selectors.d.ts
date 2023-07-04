

type Selector<TRoot, TLeaf> = (root: TRoot) => TLeaf

type SelectorHook = <TRoot, TLeaf>(selector: Selector<TRoot, TLeaf>) => TLeaf

interface IStateTools<TRoot, TLeaf> {
  stateHook: SelectorHook,
  selector: Selector<TRoot, TLeaf>
}

type VmSelector<TVm, TRoot, TModel> = (root: TRoot, model: TModel) => TVm
