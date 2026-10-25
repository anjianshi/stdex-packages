import { usePageTitle } from '@stdex/utils-frontend/react/hooks.js'

export function Students() {
  usePageTitle('学生列表')

  return <div className="page">学生列表</div>
}
