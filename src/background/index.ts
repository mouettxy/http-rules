import { transformRules } from '@/utils/transformRules'

chrome.storage.local.onChanged.addListener((changes, area) => {
  const transformed = transformRules(changes.rules.newValue)

  console.log(transformed)
})

self.onerror = function (message, source, lineno, colno, error) {
  console.log(`Error: ${message}\nSource: ${source}\nLine: ${lineno}\nColumn: ${colno}\nError object: ${error}`)
}

export {}
