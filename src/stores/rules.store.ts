import { defineStore } from 'pinia'
import { Rule, RuleGroup, RuleSetActionFileType, RuleSetActionType, RuleSetMatchCompare, RuleSetMatchType, Rules } from '@/types'
import { nanoid } from 'nanoid'
import { RemovableRef } from '@vueuse/core'

export const useRulesStore = defineStore('rules', () => {
  // @ts-ignore
  const rules = useStorageAsync('rules', [] as Rules, {
    getItem: async (key) => {
      const item = await chrome.storage.local.get([key])
      return JSON.stringify(item.rules || [])
    },
    setItem: async (key, v) => {
      const value = JSON.parse(v)
      const item = await chrome.storage.local.set({ [key]: value })
      return item
    },
  }) as RemovableRef<Rules>

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
    const ruleset = getRuleset(rules.value, ruleId, rulesetId)
    if (!ruleset) return

    ruleset.match.type = matchType
  }

  const updateMatchCompare = (ruleId: string, rulesetId: string, compare: RuleSetMatchCompare) => {
    const ruleset = getRuleset(rules.value, ruleId, rulesetId)
    if (!ruleset) return

    ruleset.match.compare = compare
  }

  const updateActionType = (ruleId: string, rulesetId: string, actionType: RuleSetActionType) => {
    const ruleset = getRuleset(rules.value, ruleId, rulesetId)
    if (!ruleset) return

    ruleset.action.type = actionType
  }

  const updateActionFileType = (ruleId: string, rulesetId: string, fileType: RuleSetActionFileType) => {
    const ruleset = getRuleset(rules.value, ruleId, rulesetId)
    if (!ruleset) return

    ruleset.action.fileType = fileType
  }

  const updateMatchUrl = (ruleId: string, rulesetId: string, url: string) => {
    const ruleset = getRuleset(rules.value, ruleId, rulesetId)
    if (!ruleset) return

    ruleset.match.url = url
  }

  const updateActionUrl = (ruleId: string, rulesetId: string, url: string) => {
    const ruleset = getRuleset(rules.value, ruleId, rulesetId)
    if (!ruleset) return

    ruleset.action.url = url
  }

  const duplicateRuleSet = (ruleId: string, rulesetId: string) => {
    const rule = getRule(rules.value, ruleId)
    if (!rule) return

    const ruleset = getRuleset(rules.value, ruleId, rulesetId)
    if (!ruleset) return

    const newRuleset = structuredClone(toRaw(ruleset))
    newRuleset.id = nanoid()

    rule.rulesets.push(reactive(newRuleset))
  }

  const deleteRuleSet = (ruleId: string, rulesetId: string) => {
    const rule = getRule(rules.value, ruleId)
    if (!rule) return

    const rulesetIndex = rule.rulesets.findIndex((ruleset) => ruleset.id === rulesetId)
    if (rulesetIndex === -1) return

    rule.rulesets.splice(rulesetIndex, 1)
  }

  const addRuleSet = (ruleId: string) => {
    const rule = getRule(rules.value, ruleId)
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
      expanded: true,
      pinned: false,
      enabled: true,
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
      const group = rules.value.find((rule) => rule.id === groupId)
      if (group && group.type === 'group') {
        group.rules.push(rule)
      }
    } else {
      rules.value.push(rule)
    }
  }

  const addGroup = () => {
    const group: RuleGroup = {
      id: nanoid(),
      sort: 1,
      title: 'Group',
      type: 'group',
      expanded: true,
      pinned: false,
      enabled: true,
      rules: [],
    }

    rules.value.push(group)
  }

  const updateRuleEnabled = (ruleId: string, enabled: boolean) => {
    const ruleList = getRulesAndGroups(rules.value)
    const rule = ruleList.find((rule) => rule.id === ruleId)
    if (!rule) return

    rule.enabled = enabled
  }

  const updateRuleExpanded = (ruleId: string, expanded: boolean) => {
    const ruleList = getRulesAndGroups(rules.value)
    const rule = ruleList.find((rule) => rule.id === ruleId)
    if (!rule) return

    rule.expanded = expanded
  }

  const updateRulePinned = (ruleId: string, pinned: boolean) => {
    const ruleList = getRulesAndGroups(rules.value)
    const rule = ruleList.find((rule) => rule.id === ruleId)
    if (!rule) return

    rule.pinned = pinned
  }

  const duplicateRule = (ruleId: string) => {
    const rule = getRule(rules.value, ruleId)
    if (!rule) return

    const group = rules.value.find((rule) => rule.type === 'group' && rule.rules && rule.rules.some((r) => r.id === ruleId)) as RuleGroup

    const newRule = structuredClone(toRaw(rule))
    newRule.id = nanoid()

    if (group) {
      group.rules.push(reactive(newRule))
    } else {
      rules.value.push(reactive(newRule))
    }
  }

  const duplicateGroup = (groupId: string) => {
    const group = rules.value.find((rule) => rule.id === groupId)
    if (!group || group.type !== 'group') return

    const newGroup = structuredClone(toRaw(group))
    newGroup.id = nanoid()
    newGroup.rules = newGroup.rules.map((rule) => {
      rule.id = nanoid()
      return rule
    })

    rules.value.push(reactive(newGroup))
  }

  const deleteRule = (ruleId: string) => {
    const ruleIndex = rules.value.findIndex((rule) => rule.id === ruleId)
    if (ruleIndex === -1) return

    rules.value.splice(ruleIndex, 1)
  }

  const deleteGroup = (groupId: string) => {
    const groupIndex = rules.value.findIndex((rule) => rule.id === groupId)
    if (groupIndex === -1) return

    rules.value.splice(groupIndex, 1)
  }

  const toggleGroupExpanded = (groupId: string) => {
    const group = rules.value.find((rule) => rule.id === groupId)
    if (!group || group.type !== 'group') return

    group.expanded = !group.expanded
  }

  const toggleRuleExpanded = (ruleId: string) => {
    const rule = getRules(rules.value).find((rule) => rule.id === ruleId)
    if (!rule || rule.type !== 'rule') return

    rule.expanded = !rule.expanded
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
    addGroup,
    updateRuleEnabled,
    updateRuleExpanded,
    updateRulePinned,
    duplicateRule,
    duplicateGroup,
    deleteRule,
    deleteGroup,
    toggleGroupExpanded,
    toggleRuleExpanded,
  }
})
