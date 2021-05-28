interface BreadcrumbsItem {
  id: number | string;
  label: string;
  active: boolean;
}

const storage = window.localStorage

export function makeCrumb (id: string, label: string) {
  return {
    id,
    label,
    active: true
  }
}

export function getHeadings (): BreadcrumbsItem[] {
  const headins = storage.getItem('headings')
  if (!headins) {
    return []
  }
  return JSON.parse(headins)
}

export const setHeadings = (id: string, label: string) => {
  const current = makeCrumb(id, label)
  const headings = getHeadings()
  const index = headings.findIndex(heading => heading.id === current.id)

  if (index < 0) {
    headings.push(current)
  } else {
    headings.splice(index, 1, current)
  }
  headings.forEach(heading => (heading.active = false))
  headings[headings.length - 1].active = true
  storage.setItem('headings', JSON.stringify(headings))
}
