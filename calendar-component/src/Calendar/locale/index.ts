import type { CalendarType } from "./interface"
import enUS from "./en-US"
import zhCN from "./zh-CN"

const allLocales: Record<string, CalendarType> = {
  'zh-CN': zhCN,
  'en-US': enUS,
}

export default allLocales