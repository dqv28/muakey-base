'use client'

import { type MDXEditorMethods, type MDXEditorProps } from '@mdxeditor/editor'
import dynamic from 'next/dynamic'
import { forwardRef, memo } from 'react'

const Editor = dynamic(() => import('./InitializedMDXEditor'), {
  ssr: false,
})

const ForwardRefEditor = memo(
  forwardRef<MDXEditorMethods, MDXEditorProps>((props, ref) => (
    <Editor {...props} editorRef={ref} />
  )),
)

ForwardRefEditor.displayName = 'ForwardRefEditor'

export default ForwardRefEditor
