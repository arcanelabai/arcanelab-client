# ArcaneLab LangChain Client Library

The official client library for the ArcaneLab LangChain to programatically interact with ArcaneLab from LangChain.

## Adding Documents
When adding a document, you can splice the document into multiple documents prior to uploading the document. However when calling the `addDocuments` function, it will group all spliced documents together under a single id. The response from adding documents would be a single id, which groups all documents together under a single id.
```javascript
await ArcaneLabVectorStore.addDocuments(documents);
```

## Adding Vectors from LangChain

In order to add a document to ArcaneLab Vector Store, you will first need to embed the document using ArcaneLab embed function. The response from adding vectors would be a single id, which groups all documents together under a single id.
```javascript
const vectors = await ArcaneLabVectorStore.embeddings.embedDocuments(
  documents.map((doc) => doc.pageContent)
);
const response = await ArcaneLabVectorStore.addVectors(vectors, documents);
```

## References
- [Full Documentation](https://docusaurus-phi-rosy.vercel.app/docs/LangChain/Javascript)