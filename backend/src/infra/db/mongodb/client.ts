import {MongoClient, Collection} from "mongodb";

export const MongoClientDB = {
  client: null as unknown as MongoClient,
  uri: null as unknown as string,

  async connect(uri: string): Promise<void> {
    this.uri = uri;
    this.client = await MongoClient.connect(uri);
  },

  async disconnect(): Promise<void> {
    await this.client.close();
  },

  getCollection(name: string): Collection {
    return this.client.db("calls").collection(name);
  },

  map: (data: any): any => {
    const {_id, ...rest} = data;
    return {...rest, id: _id.toHexString()};
  },

  mapCollection: (collection: any[]): any[] => {
    return collection.map((c) => MongoClientDB.map(c));
  },

  // function to only one record to hext id
  mapOne: (data: any): any => {
    const {_id, ...rest} = data;
    return {...rest, id: _id.toHexString()};
  },
};
