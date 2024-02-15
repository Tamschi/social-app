import {ModerationCause, LABEL_GROUPS, LabelGroupDefinition} from '@atproto/api'

export function getModerationCauseKey(cause: ModerationCause): string {
  const source =
    cause.source.type === 'labeler'
      ? cause.source.did
      : cause.source.type === 'list'
      ? cause.source.list.uri
      : 'user'
  if (cause.type === 'label') {
    return `label:${cause.label.val}:${source}`
  }
  return `${cause.type}:${source}`
}

export function getLabelGroupsFromLabels(labels: string[]) {
  const groups: LabelGroupDefinition[] = []

  for (const label of labels) {
    for (const group in LABEL_GROUPS) {
      const def = LABEL_GROUPS[group as LabelGroupDefinition['id']]
      if (def.labels.find(l => l.id === label)) {
        groups.push(def)
      }
    }
  }

  return Array.from(groups)
}
