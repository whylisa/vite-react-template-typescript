import React from "react";
import { isEqual } from "lodash";
import Spinner from "@/components/Spinner";

export const isComponentClass = (
  component: React.ComponentClass | React.ReactNode
): boolean => {
  if (!component) return false;
  const proto = Object.getPrototypeOf(component);
  if (proto === React.Component || proto === Function.prototype) return true;
  return isComponentClass(proto);
};

interface PromiseRenderProps<T, K> {
  ok: T;
  error: K;
  promise: Promise<boolean>;
}

interface PromiseRenderState {
  component: React.ComponentClass | React.FunctionComponent;
}

export default class PromiseRender<T, K> extends React.Component<
  PromiseRenderProps<T, K>,
  PromiseRenderState
> {
  state: PromiseRenderState = {
    component: () => null,
  };

  componentDidMount() {
    this.setRenderComponent(this.props);
  }

  shouldComponentUpdate = (
    nextProps: PromiseRenderProps<T, K>,
    nextState: PromiseRenderState
  ) => {
    const { component } = this.state;
    if (!isEqual(nextProps, this.props)) {
      this.setRenderComponent(nextProps);
    }
    return nextState.component !== component;
  };

  // set render Component : ok or error
  setRenderComponent(props: PromiseRenderProps<T, K>) {
    const ok = this.checkIsInstantiation(props.ok);
    const error = this.checkIsInstantiation(props.error);
    props.promise
      .then(() => {
        this.setState({
          component: ok,
        });
        return true;
      })
      .catch(() => {
        this.setState({
          component: error,
        });
      });
  }

  // Determine whether the incoming component has been instantiated
  // AuthorizedRoute is already instantiated
  // Authorized  render is already instantiated, children is no instantiated
  // Secured is not instantiated
  checkIsInstantiation = (
    target: React.ReactNode | React.ComponentClass
  ): React.FunctionComponent => {
    if (isComponentClass(target)) {
      const Target = target as React.ComponentClass;
      return (props: any) => <Target {...props} />;
    }
    if (React.isValidElement(target)) {
      return (props: any) => React.cloneElement(target, props);
    }
    return () => target as React.ReactNode & null;
  };

  render() {
    const { component: Component } = this.state;
    const { ok, error, promise, ...rest } = this.props;

    return Component ? <Component {...rest} /> : <Spinner />;
  }
}
