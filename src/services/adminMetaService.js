import { STORAGE_KEYS, loadValue, saveValue } from './storageService'

const defaultAdminMeta = {
  5001: {
    canEditUsers: true,
    canViewCreatedBy: true,
    canApproveEvents: true,
  },
  5002: {
    canEditUsers: false,
    canViewCreatedBy: false,
    canApproveEvents: true,
  },
}

export function loadAdminMeta() {
  return loadValue(STORAGE_KEYS.adminMeta, defaultAdminMeta)
}

export function saveAdminMeta(meta) {
  saveValue(STORAGE_KEYS.adminMeta, meta)
}
