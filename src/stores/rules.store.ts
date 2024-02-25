import { defineStore } from 'pinia'
import { Rule, RuleSetActionFileType, RuleSetActionType, RuleSetMatchCompare, RuleSetMatchType, Rules } from '@/types'
import { nanoid } from 'nanoid'
import { produce } from 'immer'

export const useRulesStore = defineStore('rules', () => {
  const rules = reactive([
    {
      id: nanoid(),
      title: 'TildaEditor',
      sort: 1,
      expanded: false,
      pinned: false,
      enabled: false,
      type: 'group',
      rules: [
        {
          id: nanoid(),
          sort: 1,
          title: 'Docs Public',
          type: 'rule',
          expanded: false,
          pinned: false,
          enabled: false,
          rulesets: [
            {
              id: nanoid(),
              match: {
                type: 'url',
                compare: 'contains',
                url: 'tildaeditor.com',
              },
              action: {
                type: 'redirect',
                url: 'https://tildaeditor.com',
              },
            },
          ],
        },
      ],
    },
    {
      id: nanoid(),
      sort: 1,
      title: 'Docs Public',
      type: 'rule',
      expanded: false,
      pinned: false,
      enabled: false,
      rulesets: [
        {
          id: nanoid(),
          match: {
            type: 'url',
            compare: 'contains',
            url: 'tildaeditor.com',
          },
          action: {
            type: 'redirect',
            url: 'https://tildaeditor.com',
          },
        },
      ],
    },
  ] as Rules)

  const getRules = (ruleList: Rules) => {
    return ruleList.map((rule) => (rule.type === 'group' ? rule.rules : rule)).flat()
  }

  const getRule = (ruleList: Rules, ruleId: string) => {
    return getRules(ruleList).find((rule) => rule.id === ruleId)
  }

  const getRulesAndGroups = (ruleList: Rules) => {
    return ruleList.map((rule) => (rule.type === 'group' ? [rule, ...rule.rules] : rule)).flat()
  }

  const getRuleset = (ruleList: Rules, ruleId: string, rulesetId: string) => {
    const rule = getRule(ruleList, ruleId)
    if (!rule) return

    return rule.rulesets.find((ruleset) => ruleset.id === rulesetId)
  }

  const updateMatchType = (ruleId: string, rulesetId: string, matchType: RuleSetMatchType) => {
    const ruleset = getRuleset(rules, ruleId, rulesetId)
    if (!ruleset) return

    ruleset.match.type = matchType
  }

  const updateMatchCompare = (ruleId: string, rulesetId: string, compare: RuleSetMatchCompare) => {
    const ruleset = getRuleset(rules, ruleId, rulesetId)
    if (!ruleset) return

    ruleset.match.compare = compare
  }

  const updateActionType = (ruleId: string, rulesetId: string, actionType: RuleSetActionType) => {
    const ruleset = getRuleset(rules, ruleId, rulesetId)
    if (!ruleset) return

    ruleset.action.type = actionType
  }

  const updateActionFileType = (ruleId: string, rulesetId: string, fileType: RuleSetActionFileType) => {
    const ruleset = getRuleset(rules, ruleId, rulesetId)
    if (!ruleset) return

    ruleset.action.fileType = fileType
  }

  const updateMatchUrl = (ruleId: string, rulesetId: string, url: string) => {
    const ruleset = getRuleset(rules, ruleId, rulesetId)
    if (!ruleset) return

    ruleset.match.url = url
  }

  const updateActionUrl = (ruleId: string, rulesetId: string, url: string) => {
    const ruleset = getRuleset(rules, ruleId, rulesetId)
    if (!ruleset) return

    ruleset.action.url = url
  }

  const duplicateRuleSet = (ruleId: string, rulesetId: string) => {
    const rule = getRule(rules, ruleId)
    if (!rule) return

    const ruleset = getRuleset(rules, ruleId, rulesetId)
    if (!ruleset) return

    const newRuleset = produce(ruleset, (draft) => {
      draft.id = nanoid()
    })

    rule.rulesets.push(newRuleset)
  }

  const deleteRuleSet = (ruleId: string, rulesetId: string) => {
    const rule = getRule(rules, ruleId)
    if (!rule) return

    const rulesetIndex = rule.rulesets.findIndex((ruleset) => ruleset.id === rulesetId)
    if (rulesetIndex === -1) return

    rule.rulesets.splice(rulesetIndex, 1)
  }

  const addRuleSet = (ruleId: string) => {
    const rule = getRule(rules, ruleId)
    if (!rule) return

    rule.rulesets.push({
      id: nanoid(),
      match: {
        type: 'url',
        compare: 'contains',
        url: '',
      },
      action: {
        type: 'redirect',
        url: '',
      },
    })
  }

  const addRule = (groupId?: string) => {
    const rule: Rule = {
      id: nanoid(),
      sort: 1,
      title: 'Redirect Rule',
      type: 'rule',
      expanded: false,
      pinned: false,
      enabled: false,
      rulesets: [
        {
          id: nanoid(),
          match: {
            type: 'url',
            compare: 'contains',
            url: '',
          },
          action: {
            type: 'redirect',
            url: '',
          },
        },
      ],
    }

    if (groupId) {
      const group = rules.find((rule) => rule.id === groupId)
      if (group && group.type === 'group') {
        group.rules.push(rule)
      }
    } else {
      rules.push(rule)
    }
  }

  const updateRuleEnabled = (ruleId: string, enabled: boolean) => {
    const ruleList = getRulesAndGroups(rules)
    const rule = ruleList.find((rule) => rule.id === ruleId)
    if (!rule) return

    rule.enabled = enabled
  }

  const updateRuleExpanded = (ruleId: string, expanded: boolean) => {
    const ruleList = getRulesAndGroups(rules)
    const rule = ruleList.find((rule) => rule.id === ruleId)
    if (!rule) return

    rule.expanded = expanded
  }

  const updateRulePinned = (ruleId: string, pinned: boolean) => {
    const ruleList = getRulesAndGroups(rules)
    const rule = ruleList.find((rule) => rule.id === ruleId)
    if (!rule) return

    rule.pinned = pinned
  }

  return {
    rules,
    updateMatchType,
    updateMatchCompare,
    updateActionType,
    updateActionFileType,
    updateMatchUrl,
    updateActionUrl,
    duplicateRuleSet,
    deleteRuleSet,
    addRuleSet,
    addRule,
    updateRuleEnabled,
    updateRuleExpanded,
    updateRulePinned,
  }
})
