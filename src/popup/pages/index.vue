<script setup lang="ts">
import IconAdd from '@/assets/add.svg'
import IconGroup from '@/assets/group.svg'
import { useRulesStore } from '@/stores/rules.store'

const rulesStore = useRulesStore()
</script>

<template>
  <header class="flex justify-between fixed top-0 left-0 right-0 p-4 bg-white z-50">
    <h1 class="text-2xl font-medium">HTTP Rules</h1>

    <div class="flex gap-2">
      <Button
        color="secondary"
        size="small"
        @click="() => rulesStore.addGroup()"
      >
        <IconGroup
          class="mr-1"
          width="16"
          height="16"
        />
        Add Group
      </Button>
      <Button
        color="primary"
        size="small"
        @click="() => rulesStore.addRule()"
      >
        <IconAdd
          width="16"
          height="16"
        />
        Add Rule
      </Button>
    </div>
  </header>

  <section>
    <RuleList class="mt-16" />
  </section>
</template>
