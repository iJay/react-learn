import type { SizeType } from "antd/es/config-provider/SizeContext"
import { createContext, type PropsWithChildren } from "react"

interface ConfigContextType {
  space?: {
    size?: SizeType
  }
}

export const ConfigContext = createContext<ConfigContextType>({})

type ConfigProviderProps = PropsWithChildren<ConfigContextType>

function ConfigProvider(props: ConfigProviderProps) {
  const {
    space,
    children
  } = props;

  return <ConfigContext.Provider value={{ space }}>{children}</ConfigContext.Provider>
}

export default ConfigProvider
