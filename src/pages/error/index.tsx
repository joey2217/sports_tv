import { useRouteError } from 'react-router-dom'

interface RouterError {
  statusText: string
  message: string
}

export default function ErrorPage() {
  const error = useRouteError() as RouterError
  return (
    <div>
      <header
        id="titleBarContainer"
        className="w-full border-b border-slate-900/20 dark:border-slate-50/20"
      >
        <div id="titleBar" className="px-4">
          <div className="w-full flex items-center h-10 gap-4">
            <div className="flex-1 h-full draggable leading-10 text-left">
              Error
            </div>
            {/* <ThemeButton /> */}
          </div>
        </div>
      </header>
      <div className="text-center p-10 flex gap-2 flex-col">
        <h1 className="font-semibold text-xl">出错了!</h1>
        <p>发生错误了,请稍后再试或向开发者反馈!</p>
        {error && (
          <p>
            <i>{error.statusText || error.message}</i>
          </p>
        )}
      </div>
    </div>
  )
}
