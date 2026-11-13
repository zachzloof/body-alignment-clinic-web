import { computed, type ComputedRef } from 'vue'
import { useRoute } from 'vue-router'
import { brands, type Brand } from '@/brands'

/** The sub-brand the current route belongs to. */
export function useBrand(): ComputedRef<Brand> {
  const route = useRoute()
  return computed(() => brands[route.meta.brand ?? 'clinic'])
}
