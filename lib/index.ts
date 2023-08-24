import { Document } from 'langchain/dist/document';
import { VectorStore } from 'langchain/vectorstores/base';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import axios from 'axios';
import config from './config';


interface ArcaneLabVectorStoreConstructor {
  apiKey: string;
  workspaceId: string;
  vectorStoreId: string;
  openaiAPIKey: string;
  apiEndpoint?: string;
}

class ArcaneLabVectorStore extends VectorStore {
  apiKey: string;
  workspaceId: string;
  vectorStoreId: string;
  private readonly apiEndpoint: string;
  
  constructor(params: ArcaneLabVectorStoreConstructor) {
    super(new OpenAIEmbeddings({
      openAIApiKey: params.openaiAPIKey
    }), {});
    this.apiKey = params.apiKey;
    this.workspaceId = params.workspaceId;
    this.vectorStoreId = params.vectorStoreId;
    this.apiEndpoint = params.apiEndpoint || config.defaultEndpoint;
  }

  async addVectors(vectors: number[][], documents: Document<Record<string, any>>[]): Promise<void | string[]> {
    const path = "vectors"
    const response = await this.request(path, {
      vectors,
      documents
    });
    return [response.id]
  }

  async addDocuments(documents: Document<Record<string, any>>[]): Promise<void | string[]> {
    const path = "documents"
    const response = await this.request(path, {
      documents
    });
    return [response.id];
  }

  async similaritySearchVectorWithScore(vector: number[], k: number, filter?: this['FilterType'] | undefined): Promise<[Document<Record<string, any>>, number][]> {
    const path = "similarity-search-with-score"
    const response = await this.request(path, {
      vector,
      topKCount: k,
      filter
    });
    return response;
  }

  private async request(path: string, params: any) : Promise<any> {
    const requestPath = `${this.apiEndpoint}/workspace/${this.workspaceId}/document-store/${this.vectorStoreId}/vectors/${path}`
    const result = await axios.post(requestPath, params, {
      headers: {
        'x-api-key': this.apiKey
      }
    });
    return result.data;
  }

  _vectorstoreType(): string {
    return "ArcaneLabVectorStore"
  }
}

export default ArcaneLabVectorStore;