import { useMemo } from 'react'
import { canViewEvent } from '../../utils/permissions'

// هذه الدالة تجمع القيم المشتقة من الحالات الأساسية.
export function useStoreSelectors({ users, events, currentUserId, currentUser }) {
  const resolvedCurrentUser = useMemo(
    () => currentUser || users.find((user) => user.id === currentUserId) || null,
    [currentUser, users, currentUserId]
  )

  const usersById = useMemo(
    () => Object.fromEntries(users.map((user) => [user.id, user])),
    [users]
  )

  const viewableEvents = useMemo(
    () => events.filter((item) => canViewEvent(resolvedCurrentUser, item)),
    [events, resolvedCurrentUser]
  )

  return {
    currentUser: resolvedCurrentUser,
    usersById,
    viewableEvents,
  }
}
