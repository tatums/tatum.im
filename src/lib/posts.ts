const imports = import.meta.globEager('./content/*.md');

const posts = [];
for (const path in imports) {
  const post = imports[path];
  const cleanedSlug = path.replace('./content/', '').replace('.svelte.md', '').replace(/^\d\d\d\d-\d\d-\d\d-/, '')
  const date = post.metadata.date
  const year = new Date(date).toLocaleString('en-US', { year: 'numeric' })
  const month = new Date(date).toLocaleString('en-US', { month: '2-digit' })
  const day = new Date(date).toLocaleString('en-US', { day: '2-digit' })
  const monthName = new Date(date).toLocaleString('en-US', { month: 'long' })

  // console.log(date.toLocaleString('en-US', {
  //   weekday: 'short', // long, short, narrow
  //   day: 'numeric', // numeric, 2-digit
  //   year: 'numeric', // numeric, 2-digit
  //   month: 'long', // numeric, 2-digit, long, short, narrow
  //   hour: 'numeric', // numeric, 2-digit
  //   minute: 'numeric', // numeric, 2-digit
  //   second: 'numeric', // numeric, 2-digit
  // }));

  const postPath = `/blog/${year}/${month}/${day}/${cleanedSlug}`

  const formattedDate = `${monthName} ${day}, ${year}`

  if (post) {
    posts.push({
      ...post.metadata,
      slug: cleanedSlug,
      postPath: postPath,
      formattedDate: formattedDate,
      ...post.default.render()
    });
  }
}


// i.e. slug: 2017-01-08-run-remote-commands-over-ssh'
//
export const getPost = async (slug) => {
  return posts.find(p => {
    return p.slug == slug
  })
}

export const getPosts = async (limit = null) => {
  const sortedPosts = posts.sort((a, b) =>
    new Date(a.date).getTime() > new Date(b.date).getTime()
      ? -1
      : new Date(a.date).getTime() < new Date(b.date).getTime()
        ? 1
        : 0
  )
  return limit == null ? sortedPosts : sortedPosts.slice(0, limit)
}
