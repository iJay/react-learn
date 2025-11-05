import copy from "copy-to-clipboard";
import React, { type PropsWithChildren } from "react";

type CopyToClipboardProps = PropsWithChildren<{
  text: string;
  onCopy?: (text: string, result: boolean) => void;
  options?: {
    debug?: boolean;
    message?: string;
    format?: string
  }
}>

function CopyToClipboard (props: CopyToClipboardProps) {
  const {
    text,
    onCopy,
    options,
    children
  } = props

  // 断言 children 只有一个元素，如果不是就报错
  const ele = React.Children.only(children)

  function onClick(event: MouseEvent) {
    const ele = React.Children.only(children)

    const result = copy(text, options)

    if (onCopy) {
      onCopy(text, result)
    }

    if (typeof ele?.props?.onClick === 'function') {
      ele?.props.onClick(event)
    }
  }


  return React.cloneElement(ele, { onClick })
}

export default CopyToClipboard
