<script setup lang="ts">
import IconAdd from '@/assets/add.svg'
import IconGroup from '@/assets/group.svg'
import { useRulesStore } from '@/stores/rules.store'

const rulesStore = useRulesStore()
</script>

<template>
  <header class="flex justify-between">
    <h1 class="text-4xl font-medium">HTTP Rules</h1>

    <div class="flex gap-2">
      <Button
        color="secondary"
        size="default"
        @click="() => rulesStore.addGroup()"
      >
        <IconGroup
          width="24"
          height="24"
        />
        Add Group
      </Button>
      <Button
        color="primary"
        size="default"
        @click="() => rulesStore.addRule()"
      >
        <IconAdd
          width="24"
          height="24"
        />
        Add Rule
      </Button>
    </div>
  </header>
  <section>
    <RuleList class="mt-10" />
  </section>
</template>
