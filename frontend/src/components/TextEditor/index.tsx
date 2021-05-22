import Quill, { TextChangeHandler } from 'quill';
import Delta from 'quill/node_modules/quill-delta/dist/Delta';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';

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
  const { id: documentId } = useParams<{ id: string }>();
  const [socket, setSocket] =
    useState<Socket<DefaultEventsMap, DefaultEventsMap>>();
  const [quill, setQuill] = useState<Quill>();

  useEffect(() => {
    const s = io('http://localhost:3001');
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket || !quill) return;

    socket?.once('load-document', (document) => {
      quill?.setContents(document);
      quill?.enable();
    });

    socket?.emit('get-document', documentId);
  }, [socket, quill, documentId]);

  useEffect(() => {
    if (!socket || !quill) return;

    const saveDocumentInterval = setInterval(() => {
      socket.emit('save-document', quill.getContents());
    }, 2000);

    return () => {
      clearInterval(saveDocumentInterval);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (!socket || !quill) return;

    const handler: TextChangeHandler = (delta, oldDelta, source) => {
      if (source !== 'user') return;

      socket?.emit('send-changes', delta);
    };

    quill?.on('text-change', handler);

    return () => {
      quill?.off('text-change', handler);
    };
  }, [quill, socket]);

  useEffect(() => {
    if (!socket || !quill) return;

    const handler = (delta: Delta) => {
      quill?.updateContents(delta);
    };

    socket?.on('receive-changes', handler);

    return () => {
      socket?.off('receive-changes', handler);
    };
  }, [quill, socket]);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper === null) return;

    // eslint-disable-next-line no-param-reassign
    wrapper.innerHTML = '';

    const editor = document.createElement('div');

    wrapper.append(editor);

    const q = new Quill(editor, {
      theme: 'snow',
      modules: {
        toolbar: TOOLBAR_OPTIONS,
      },
    });

    q.disable();
    q.setText('');

    setQuill(q);
  }, []);

  return <Container id="container" ref={wrapperRef} />;
};
