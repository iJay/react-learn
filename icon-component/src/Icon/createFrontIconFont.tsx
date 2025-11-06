import Icon, { type IconProps } from "."

const loadResourceSet = new Set<string>()

function createFrontIconFont (scriptUrl: string) {
  if (typeof scriptUrl === 'string'
    && scriptUrl.length
    && !loadResourceSet.has(scriptUrl)
  ) {
    const scriptEle = document.createElement('script')
    scriptEle.setAttribute('src', scriptUrl)
    scriptEle.setAttribute('data-namespace', scriptUrl)
    document.body.appendChild(scriptEle)
    loadResourceSet.add(scriptUrl)
  }

  const IconFont = (props: IconProps) => {
    const { type, ref, ...rest} = props
    return (
      <Icon {...rest} ref={ref}>
        type ? <use xlinkHref={`#${type}`} /> : null
      </Icon>
    )
  }
  return IconFont
}

export default createFrontIconFont