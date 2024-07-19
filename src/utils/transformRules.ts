import { Rules, Rule } from '@/types'

export const transformRules = (ruleList: Rules) => {
  let rules = ruleList
    .map((rule) => {
      if (rule.type === 'group' && !rule.enabled) {
        return false
      } else if (rule.type === 'group') {
        return rule.rules
      }

      return rule
    })
    .flat()
    .filter(Boolean)
  rules = (rules as Rule[]).filter((rule) => rule.enabled)

  return rules
}
