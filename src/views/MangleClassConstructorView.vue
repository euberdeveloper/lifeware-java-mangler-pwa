<script setup lang="ts">
import {
  mangleConstructorDefinition,
  mangleConstructorSignature,
  validateConstructorSignature
} from 'lifeware-java-mangler';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';

import { useClipboard } from '@/compositions/clipboard';
import { useMangling, useManglingValidation } from '@/compositions/mangler';
import { syncStringQueryParam } from '@/compositions/syncQueryParam';
import { useManglersStore } from '@/stores/manglers';

const { copyToClipboard } = useClipboard();
const { classConstructor } = storeToRefs(useManglersStore());
const { isInputValid, mangledValidationRule } = useManglingValidation(
  classConstructor,
  validateConstructorSignature
);
const { displayedMangled: displayedMangledConstructorSignature } = useMangling(
  classConstructor,
  isInputValid,
  mangleConstructorSignature
);
const { displayedMangled: displayedMangledConstructorDefinition } = useMangling(
  classConstructor,
  isInputValid,
  mangleConstructorDefinition
);

const { updateRouteQuery } = syncStringQueryParam(
  classConstructor,
  useRouter(),
  useRoute(),
  'mangleClassConstructor'
);
updateRouteQuery();
</script>

<template>
  <v-card-text class="mt-4 mx-2">
    <v-text-field
      v-model="classConstructor"
      type="text"
      :label="$t('views.mangle-class-constructor.class-constructor')"
      variant="outlined"
      density="compact"
      clearable
      :rules="[mangledValidationRule]"
    />
    <v-text-field
      :model-value="displayedMangledConstructorSignature"
      type="text"
      :label="$t('views.mangle-class-constructor.mangled-signature')"
      variant="outlined"
      density="compact"
      readonly
      persistent-placeholder
      append-inner-icon="mdi-content-copy"
      @click:append-inner="copyToClipboard(displayedMangledConstructorSignature)"
      v-if="displayedMangledConstructorSignature"
    />
    <v-textarea
      :model-value="displayedMangledConstructorDefinition"
      type="text"
      :label="$t('views.mangle-class-constructor.mangled-definition')"
      variant="outlined"
      density="compact"
      readonly
      auto-grow
      persistent-placeholder
      append-inner-icon="mdi-content-copy"
      @click:append-inner="copyToClipboard(displayedMangledConstructorDefinition)"
      v-if="displayedMangledConstructorDefinition"
    />
  </v-card-text>
</template>
