/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context, createElement, PropsWithChildren, ReactNode } from 'react';
import reverse from 'lodash/reverse';

export interface ProvidableContext<T> {
  context: Context<T>;
  initialValue(): T;
}
interface Props {
  // FIXME: Can we get rid of the `any`?
  providers?: ProvidableContext<any>[];
}

const EMPTY_CONTEXTS: ProvidableContext<any>[] = [];

export default function ContextProvider({
  providers = EMPTY_CONTEXTS,
  children,
}: PropsWithChildren<Props>) {
  // Reverse the configs so that the most inner context wrapper is generated first.
  const reversedConfigs = reverse(providers);
  const hierarchy = reversedConfigs.reduce<ReactNode>(
    (children, { context, initialValue }) => {
      return createElement(
        context.Provider,
        { value: initialValue() },
        children
      );
    },
    children
  );
  return <>{hierarchy}</>;
}
