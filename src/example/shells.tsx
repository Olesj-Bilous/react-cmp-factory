import { useDispatch } from "react-redux";

const stringShell: ComponentShell<string, NoReactProps> = function <TRoot>(stateTools: IStateTools<TRoot, string>) {
  return function StringComponent() {
    const state = stateTools.stateHook(stateTools.selector);
    return <>{state}</>
  }
}

const stringInputShell: ComponentShell<string, NoReactProps> = function <TRoot>(stateTools: IStateTools<TRoot, string>) {
  return function StringInput() {
    const state = stateTools.stateHook(stateTools.selector);
    return <input type="text" value={state} />
  }
}

const booleanInputShell: ComponentShell<boolean, NoReactProps> = function <TRoot>(stateTools: IStateTools<TRoot, boolean>) {
  return function BooleanInput() {
    const state = stateTools.stateHook(stateTools.selector);
    const dispatch = useDispatch();
    return <input type="checkbox" checked={state} onChange={() => dispatch({ type: 'example/togglePropertyEdit', payload: 'well' })} />
  }
}

export { stringShell, stringInputShell, booleanInputShell };
