import { render } from 'svelte/server';

const imports = import.meta.glob('./content/*.svelte.md', { eager: true });

const posts = [];
for (const path in imports) {
  const post = imports[path] as any;
  const cleanedSlug = path.replace('./content/', '').replace('.svelte.md', '').replace(/^\d\d\d\d-\d\d-\d\d-/, '');
  const date = post.metadata.date;
  const year = new Date(date).toLocaleString('en-US', { year: 'numeric' });
  const month = new Date(date).toLocaleString('en-US', { month: '2-digit' });
  const day = new Date(date).toLocaleString('en-US', { day: '2-digit' });
  const monthName = new Date(date).toLocaleString('en-US', { month: 'long' });

  const postPath = `/blog/${year}/${month}/${day}/${cleanedSlug}`;

  const formattedDate = `${monthName} ${day}, ${year}`;
  const formattedDateShort = `${month}/${day}/${year}`;

  if (post) {
    // Render the component to get HTML (Svelte 5 API)
    const { body: html } = render(post.default, { props: {} });

    posts.push({
      ...post.metadata,
      slug: cleanedSlug,
      postPath: postPath,
      formattedDate: formattedDate,
      formattedDateShort: formattedDateShort,
      html
    });
  }
}

// i.e. slug: 2017-01-08-run-remote-commands-over-ssh'
export const getPost = async (slug: string) => {
  return posts.find(p => {
    return p.slug == slug;
  });
};

const postItems = (inputArray: any[] = [], perChunk = 5) => {
  return inputArray.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / perChunk);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, [] as any[][]);
};

export const getPosts = async (page: number = 1) => {
  const sortedPosts = posts.sort((a, b) =>
    new Date(a.date).getTime() > new Date(b.date).getTime()
      ? -1
      : new Date(a.date).getTime() < new Date(b.date).getTime()
        ? 1
        : 0
  );
  const pages = postItems(sortedPosts, 5);
  return {
    posts: pages[page - 1],
    page: page,
    pagesCount: pages.length
  };
};
