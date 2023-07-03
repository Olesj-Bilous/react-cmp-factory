import React from "react";

export default function modelComponentFactory<TModel>(shells: {
  [Key in keyof TModel]: AnyRootedViewShell<TModel[Key], {}>
}) {
  return function<TRoot>(selector: Selector<TRoot, TModel>) {
    const content : JSX.Element[] = [];
    for (const key in shells) {
      const Component = shells[key]((root: TRoot) => selector(root)[key]);
      content.push(<Component key={key} />)
    }
    return function Content() {
      return <>{content}</>;
    }
  }
}
