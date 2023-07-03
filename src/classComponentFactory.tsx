import { ComponentFactory } from "./componentFactory";


export default function classComponentFactory<TModel>(shells: {
  [Key in keyof TModel]: ComponentFactory<any, TModel[Key], any, {}>
}) {
  return function<TRoot>(selector: Selector<TRoot, TModel>) {
    const content : JSX.Element[] = [];
    for (const key in shells) {
      const Component = shells[key].createComponent(root => selector(root)[key]);
      content.push(<Component key={key} />)
    }
    return function Content() {
      return <>{content}</>;
    }
  }
}
