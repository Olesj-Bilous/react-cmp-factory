

type NoReactProps = React.Attributes

type ReactComponent<TProps extends NoReactProps> = (props: TProps) => JSX.Element

type DefaultReactComponent = ReactComponent<NoReactProps>
