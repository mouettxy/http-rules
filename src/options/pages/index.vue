<script setup lang="ts">
import IconAdd from '@/assets/add.svg'
import IconGroup from '@/assets/group.svg'
</script>

<template>
  <header class="flex justify-between">
    <h1 class="text-4xl font-medium">HTTP Rules</h1>

    <div class="flex gap-2">
      <Button
        color="secondary"
        size="default"
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
