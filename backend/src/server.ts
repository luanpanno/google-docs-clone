import { Socket } from 'socket.io';
import { DocumentSchema, Document } from './models/Document';
import { mongoConnect } from './config/db';

mongoConnect();

const io = require('socket.io')(3001, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

async function findOrCreateDocument(documentId: string): Promise<Document> {
  if (!documentId) return {} as Document;

  const document = await DocumentSchema.findById(documentId);

  if (document) return document;

  return await DocumentSchema.create({ _id: documentId, data: '' });
}

io.on('connection', (socket: Socket) => {
  socket.on('get-document', async (documentId: string) => {
    const document = await findOrCreateDocument(documentId);

    socket.join(documentId);
    socket.emit('load-document', document?.data);

    socket.on('send-changes', (delta) => {
      socket.broadcast.to(documentId).emit('receive-changes', delta);
    });

    socket.on('save-document', async (data) => {
      await DocumentSchema.findByIdAndUpdate(documentId, { data });
    });
  });
});
