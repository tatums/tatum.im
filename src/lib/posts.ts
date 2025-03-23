let posts: any[] = [];
const paths = import.meta.glob('/src/posts/*.md', { eager: true });
for (const path in paths) {
  const file = paths[path];
  if (file && typeof file === 'object' && 'metadata' in file) {
    const metadata = file.metadata as Omit<any, 'slug'>;
    const cleanedSlug = path.split('/').at(-1)?.replace('.md', '')?.replace(/^\d\d\d\d-\d\d-\d\d-/, '')

    const date = metadata.date.replace(' ', 'T').replace(' -', '-').replace(' +', '+');
    const year = new Date(date).toLocaleString('en-US', { year: 'numeric' })
    const month = new Date(date).toLocaleString('en-US', { month: '2-digit' })
    const day = new Date(date).toLocaleString('en-US', { day: '2-digit' })
    const monthName = new Date(date).toLocaleString('en-US', { month: 'long' })
    const formattedDate = `${monthName} ${day}, ${year}`
    const formattedDateShort = `${month}/${day}/${year}`
    const post = {
      ...metadata,
      slug: cleanedSlug,
      year,
      month,
      day,
      monthName,
      formattedDate,
      formattedDateShort,
      html: file.default
    } satisfies any;

    if (post.date) {
      posts.push(post);
    }
  }
}
posts = posts.sort((a, b) => {
  const dateA = a.date.replace(' ', 'T').replace(' -', '-').replace(' +', '+');
  const dateB = b.date.replace(' ', 'T').replace(' -', '-').replace(' +', '+');
  return new Date(dateB).getTime() - new Date(dateA).getTime();
});


// i.e. slug: 2017-01-08-run-remote-commands-over-ssh'
//
export const getPost = async (slug) => {
  return posts.find(p => {
    return p.slug == slug
  })
}

const postItems = (inputArray = [], perChunk = 5) => {
  return inputArray.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index/perChunk)
    if(!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [] // start a new chunk
    }
    resultArray[chunkIndex].push(item)
    return resultArray
  }, [])
}

export const getPosts = async (page: number = 1) => {
  const pages = postItems(posts, 5)
  return {
    posts: pages[page - 1],
    page: page,
    pagesCount: pages.length
  }
}

