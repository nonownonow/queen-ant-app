import React from 'react'

export default {
  H1: (p) => <h1 {...p}>{p.children}</h1>,
  Nav: (p) => <nav {...p}>{p.children}</nav>,
  Ul: (p) => <ul {...p}>{p.children}</ul>,
  Li: (p) => <li {...p}>{p.children}</li>
}
