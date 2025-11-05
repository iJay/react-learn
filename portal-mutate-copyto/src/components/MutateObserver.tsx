import type { PropsWithChildren } from "react";
import React, { useLayoutEffect, useRef, useState } from "react";
import useMutateObserver from "../hooks/useMutateObserver";

type MutateObserverProps = PropsWithChildren<{
  onMutate?: (mutations: MutationRecord[], observer: MutationObserver) => void;
  options?: MutationObserverInit;
}>

function MutateObserver (props: MutateObserverProps) {
  const {
    children,
    onMutate = () => {},
    options
  } = props

  const eleRef = useRef<HTMLElement>(null)

  const [target, setTarget] = useState<HTMLElement>()

  useMutateObserver(target!, onMutate, options)

  useLayoutEffect(() => {
    // 触发重新渲染 target就有值了
    setTarget(eleRef.current!)
  }, [])

  if (!children) return null

  return React.cloneElement(children, { ref: eleRef })
}

export default MutateObserver
