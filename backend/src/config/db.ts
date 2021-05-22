import mongoose from 'mongoose';

export function mongoConnect(): void {
  mongoose
    .connect('mongodb://localhost/google-docs-clone', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(
      () => {
        console.log(
          'Database connected succesfully at mongodb://localhost/google-docs-clone \n'
        );
      },
      (err) => {
        console.log(`Error on database connect...: ${err}`);
        process.exit();
      }
    );
}
