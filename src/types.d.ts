export type RuleGroup = {
  id: string
  title: string
  sort: number
  expanded: boolean
  pinned: boolean
  enabled: boolean
  type: 'group'
  rules: Rule[]
}

export type Rule = {
  id: string
  sort: number
  title: string
  type: 'rule'
  expanded: boolean
  pinned: boolean
  enabled: boolean
  rulesets: RuleSetItem[]
}

export type RuleSetMatchType = 'url' | 'host' | 'path'
export type RuleSetMatchCompare = 'equals' | 'contains' | 'regex'
export type RuleSetActionType = 'redirect' | 'replace' | 'block' | 'insert'
export type RuleSetActionFileType = 'css' | 'js' | undefined

export type RuleSetItem = {
  id: string
  match: {
    type: RuleSetMatchType
    compare: RuleSetMatchCompare
    url: string
  }
  action: {
    type: RuleSetActionType
    url: string
    fileType?: RuleSetActionFileType
  }
}

export type Rules = (RuleGroup | Rule)[]