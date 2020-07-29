const url =
  process.env.MONGODB_URI ||
  'mongodb+srv://lahcen:246810@devconnector-t8z8k.mongodb.net/<dbname>?retryWrites=true&w=majority';

module.exports = url;
