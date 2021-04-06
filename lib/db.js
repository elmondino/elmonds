import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://elmonds:SQByEFVupWcSuj8T@cluster0.gfzfo.mongodb.net/users?retryWrites=true&w=majority'
  );

  return client;
}
