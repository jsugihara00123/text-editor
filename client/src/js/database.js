import { openDB } from 'idb';

const init_DB = async () =>
  openDB('jate', 1, {
    upgrade(db) {

      if (db.objectStoreNames.contains('jate')) {
        console.log('oops! the database jate already exists');
        return;
      }

      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('the database jate is created');
    },

  });

export const putDb = async (id, content) => {
  console.log('API - PUT to the database: jate');

  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: id, content: content });

  const result = await request;
  console.log('🚀 - data is now saved to the database', result);
};



export const getDb = async () => {

  console.log('API - GET from the database: jate');

  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();

  const result = await request;
  console.log('result.value', result);
};


//run function

init_DB();
