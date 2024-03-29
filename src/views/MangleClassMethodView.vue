<script setup lang="ts">
import {
  mangleMethodDefinition,
  mangleMethodSignature,
  validateMethodSignature
} from 'lifeware-java-mangler';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';

import { useClipboard } from '@/compositions/clipboard';
import { useMangling, useManglingValidation } from '@/compositions/mangler';
import { syncStringQueryParam } from '@/compositions/syncQueryParam';
import { useManglersStore } from '@/stores/manglers';

const { copyToClipboard } = useClipboard();
const { classMethod } = storeToRefs(useManglersStore());
const { isInputValid, mangledValidationRule } = useManglingValidation(
  classMethod,
  validateMethodSignature
);
const { displayedMangled: displayedMangledMethodSignature } = useMangling(
  classMethod,
  isInputValid,
  mangleMethodSignature
);
const { displayedMangled: displayedMangledMethodDefinition } = useMangling(
  classMethod,
  isInputValid,
  mangleMethodDefinition
);

const { updateRouteQuery } = syncStringQueryParam(
  classMethod,
  useRouter(),
  useRoute(),
  'mangleClassMethod'
);
updateRouteQuery();
</script>

<template>
  <v-card-text class="mt-4 mx-2">
    <v-text-field
      v-model="classMethod"
      type="text"
      :label="$t('views.mangle-class-method.class-method')"
      variant="outlined"
      density="compact"
      clearable
      :rules="[mangledValidationRule]"
    />
    <v-text-field
      :model-value="displayedMangledMethodSignature"
      type="text"
      :label="$t('views.mangle-class-method.mangled-signature')"
      variant="outlined"
      density="compact"
      readonly
      persistent-placeholder
      append-inner-icon="mdi-content-copy"
      @click:append-inner="copyToClipboard(displayedMangledMethodSignature)"
      v-if="displayedMangledMethodSignature"
    />
    <v-textarea
      :model-value="displayedMangledMethodDefinition"
      type="text"
      :label="$t('views.mangle-class-method.mangled-definition')"
      variant="outlined"
      density="compact"
      readonly
      auto-grow
      persistent-placeholder
      append-inner-icon="mdi-content-copy"
      @click:append-inner="copyToClipboard(displayedMangledMethodDefinition)"
      v-if="displayedMangledMethodDefinition"
    />
  </v-card-text>
</template>
