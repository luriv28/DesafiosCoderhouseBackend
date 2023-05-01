import admin from "firebase-admin";
import fs from "fs";
const serviceAccount = JSON.parse(
  fs.readFileSync(
    "../firebaseDbConfig/coderhouse-backend-ffb2e-firebase-adminsdk-dk35h-7d01e0d253.json"
  )
);

class firebaseContainer {
  constructor(collection, serviceAccount) {
    this.collection = collection;
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    this.db = admin.firestore();
  }

  async save(object) {
    // WHEN ERROR, UNDEFINED IS RETURNED
    try {
      const query = this.db.collection(this.collection);
      return (await query.add(object)).id;
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  async getById(id) {
    // WHEN NO ROW IS FOUND RETURNS EMPTY ARRAY
    try {
      const doc = this.db.collection(this.collection).doc(id);
      return (await doc.get()).data();
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  async update(id, newObject) {
    // WHEN ERROR, UNDEFINED IS RETURNED
    try {
      const query = this.db.collection(this.collection).doc(id);
      return await query.update(newObject);
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  async getAll() {
    // WHEN NO ROW IS FOUND RETURNS EMPTY ARRAY
    try {
      const doc = this.db.collection(this.collection);
      const docs = [];
      const response = await doc.get();
      response.forEach((doc) => {
        docs.push(doc.data());
      });
      return docs;
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  async deleteById(id) {
    try {
      const doc = this.db.collection(this.collection).doc(id);
      return await doc.delete();
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  async deleteAll() {
    try {
      const docs = await this.db.collection(this.collection).get();
      docs.forEach((doc) => {
        doc.ref.delete();
      });
      return docs.length;
    } catch (error) {
      console.log(error);
    } finally {
    }
  }
}
