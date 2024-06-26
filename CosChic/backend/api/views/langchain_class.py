import os
from langchain_community.document_loaders import PyPDFLoader
from langchain_openai import OpenAIEmbeddings
from langchain_text_splitters import CharacterTextSplitter
from langchain_community.vectorstores import FAISS, Chroma
from langchain.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_community.chat_models import ChatOpenAI
from langchain_core.output_parsers import StrOutputParser
from langchain import hub
from dotenv import load_dotenv


load_dotenv()

class RAGPipeline:
    def __init__(self, persist_directory='LCdb', llm_model="gpt-3.5-turbo-0125", temperature=0.5):
        os.environ["OPENAI_API_KEY"] = os.getenv('OPENAI_KEY')
        self.doc_path = '/home/ai/ai/chicbytes/CosChic/backend/docs/pdf_file.pdf'
        self.persist_directory = persist_directory
        self.llm_model = llm_model
        self.temperature = temperature
        self.embedding_model = OpenAIEmbeddings()
        self.prompt_template = hub.pull("rlm/rag-prompt")
        
    def load_documents(self):
        loader = PyPDFLoader(self.doc_path)
        raw_documents = loader.load()
        return raw_documents

    def split_documents(self, raw_documents, chunk_size=1000, chunk_overlap=0):
        text_splitter = CharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
        documents = text_splitter.split_documents(raw_documents)
        return documents

    def create_vector_store(self, documents, store_type='chroma'):
        if store_type == 'faiss':
            vectorstore = FAISS.from_documents(documents=documents, embedding=self.embedding_model, persist_directory=self.persist_directory)
        else:
            vectorstore = Chroma.from_documents(documents=documents, embedding=self.embedding_model, persist_directory=self.persist_directory)
        return vectorstore

    def get_retriever(self, vectorstore, search_type="similarity", k=6):
        retriever = vectorstore.as_retriever(search_type=search_type, search_kwargs={"k": k})
        return retriever

    def format_docs(self, docs):
        return "\n\n".join(doc.page_content for doc in docs)

    def create_chain(self, retriever):
        llm = ChatOpenAI(model=self.llm_model, temperature=self.temperature)
        rag_chain = (
            {"context": retriever | self.format_docs, "question": RunnablePassthrough()}
            | self.prompt_template
            | llm
            | StrOutputParser()
        )
        return rag_chain

    def run(self, question, store_type='chroma'): 
        raw_documents = self.load_documents()
        documents = self.split_documents(raw_documents)
        vectorstore = self.create_vector_store(documents, store_type)
        retriever = self.get_retriever(vectorstore)
        chain = self.create_chain(retriever)
        answer = chain.invoke(question)
        return answer

# 예시 사용법

# from converted_script import *

# model = RAGPipeline(api_key='sk-proj-mdUCTVAEC3sNfgZN7FooT3BlbkFJ6URSqOvcr2YURTWja1sc',
#                     doc_path='./docs/pdf_file.pdf')

# print(model.run(question= "안녕"))

