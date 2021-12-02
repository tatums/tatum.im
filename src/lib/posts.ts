const imports = import.meta.globEager('./content/*.md');

const posts = [];
for (const path in imports) {

  console.log('path', path)
  const post = imports[path];
  if (post) {
    posts.push({
      ...post.metadata,
      ...post.default.render()
    });
  }
}

export const getPosts = async () => {

  console.log('post', posts[0])

  return posts.sort((a, b) =>
    new Date(a.date).getTime() > new Date(b.date).getTime()
      ? -1
      : new Date(a.date).getTime() < new Date(b.date).getTime()
      ? 1
      : 0
  )

}


// export const getPosts = async (postsContent, body = false) => {
//   console.log('>>>> getPosts');
//
//   let result = postsContent.map(async (element) => {
//     const { content, slug } = element;
//     const transformedContent = await compile(content);
//     const { datePublished, lastUpdated, postTitle, seoMetaDescription } =
//       transformedContent.data.fm;
//     let resultElement = { datePublished, lastUpdated, postTitle, seoMetaDescription, slug };
//     if (body) {
//       resultElement = { ...resultElement, body: transformedContent.code };
//     }
//     return resultElement;
//   });
//   result = await Promise.all(result);
//   return result.sort((a, b) => Date.parse(b.datePublished) - Date.parse(a.datePublished));
// };
