const imports = import.meta.globEager('./content/*.md');

const posts = [];
for (const path in imports) {
  // console.log('path', path)
  const post = imports[path];
  const cleanedSlug = path.replace('./content/', '').replace('.svelte.md', '')

  if (post) {
    posts.push({
      ...post.metadata,
      slug: cleanedSlug,
      ...post.default.render()
    });
  }
}


// i.e. slug: 2017-01-08-run-remote-commands-over-ssh'
//
export const getPost = async (slug) => {
  return posts.find(e => e.slug == slug)
}

export const getPosts = async () => {
  return posts.sort((a, b) =>
    new Date(a.date).getTime() > new Date(b.date).getTime()
      ? -1
      : new Date(a.date).getTime() < new Date(b.date).getTime()
      ? 1
      : 0
  )

}
