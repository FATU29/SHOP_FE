import dynamic from 'next/dynamic'
import { EditorProps } from 'react-draft-wysiwyg'

const ReactDraftWysiwyg = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((mod) => {
    return mod.Editor
  }),
  { ssr: false }
)

export default ReactDraftWysiwyg;