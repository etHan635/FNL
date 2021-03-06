from sentence_transformers import SentenceTransformer
from tqdm import tqdm
import pickle as pkl
import numpy as np

sentences_path = r'Tutorial/Final Text/0_1.txt'
pickled_path = r'Tutorial/Embeddings/0_1.pkl'

#Load model
print("Loading model...")
model = SentenceTransformer('bert-large-nli-stsb-mean-tokens')

#Load sentences
with open(sentences_path, 'r', encoding='utf-8') as sentence_file:
        sentences = sentence_file.readlines()
        
#Generate embeddings
print("Generating Embeddings...")
embeddings = model.encode(sentences[0], show_progress_bar="true").tolist()
#Convert to NumPy array
data_as_np_array = np.array([sentences[0], embeddings])
#Pickle
with open(pickled_path, 'wb') as pickled_file:
    pkl.dump(data_as_np_array, pickled_file)