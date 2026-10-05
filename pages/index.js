import fs from 'fs'
import path from 'path'

export default function Page({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export async function getStaticProps() {
  const html = fs.readFileSync(
    path.join(process.cwd(), 'public', 'index.html'),
    'utf-8'
  )
  return { props: { html }, revalidate: false }
}
