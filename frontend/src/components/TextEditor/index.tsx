import Quill from 'quill';
import { useCallback } from 'react';

import { Container } from './styles';

import 'quill/dist/quill.snow.css';

const TOOLBAR_OPTIONS = [
  [
    {
      header: [1, 2, 3, 4, 5, 6, false],
    },
  ],
  [{ font: [] }],
  [{ list: 'ordered' }, { list: 'bullet ' }],
  ['bold', 'italic', 'underline'],
  [{ color: [] }, { background: [] }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ align: [] }],
  ['image', 'blockquote', 'code-block'],
  ['clean'],
];

export const TextEditor = () => {
  const wrapperRef = useCallback((wrapper) => {
    if (wrapper === null) return;

    // eslint-disable-next-line no-param-reassign
    wrapper.innerHTML = '';

    const editor = document.createElement('div');

    wrapper.append(editor);

    new Quill(editor, {
      theme: 'snow',
      modules: {
        toolbar: TOOLBAR_OPTIONS,
      },
    });
  }, []);

  return <Container id="container" ref={wrapperRef} />;
};
