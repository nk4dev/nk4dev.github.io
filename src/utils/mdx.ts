/**
 * Fixed for nextjs
 * module.exports => export {}
 **/

export async function parseMdx(source) {
  // Dynamically import ESM package to avoid Next.js "import ESM packages" build error
  const mdxSerializeMod = await import('next-mdx-remote/serialize')
  const { serialize } = mdxSerializeMod

  const { default: remarkGfm } = await import('remark-gfm')

  return await serialize(source, {
    mdxOptions: {
      // Cast to unified.Pluggable to avoid type mismatches from nested vfile types
      remarkPlugins: [remarkGfm as unknown as import('unified').Pluggable],
    },
  })
}

