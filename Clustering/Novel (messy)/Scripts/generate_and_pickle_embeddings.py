from sentence_transformers import SentenceTransformer
from tqdm import tqdm
import pickle as pkl
import pandas as pd
import numpy as np
import datetime
import os

sentences_path = r'Final Text'

pickled_path = r'Pickled Sentences/All'

#Load model
print(str(datetime.datetime.now().time().strftime("%H:%M:%S")) + " Loading bert-large-nli-stsb-mean-tokens model...")
model = SentenceTransformer('bert-large-nli-stsb-mean-tokens')
print(str(datetime.datetime.now().time().strftime("%H:%M:%S")) + " BERT loaded!")

#Load sentences
print(str(datetime.datetime.now().time().strftime("%H:%M:%S")) + " Loading sentences...")
all_sentences = []
raw_file_pathes = os.listdir(sentences_path)

#limit to test
#raw_file_pathes = [raw_file_pathes[0]]

for i in tqdm(range(len(raw_file_pathes)), ):
    path = sentences_path + r'/' + raw_file_pathes[i]
    with open(path, 'r', encoding='utf-8') as sentence_file:
        sentences = sentence_file.readlines()
        all_sentences.append(sentences)
print(str(datetime.datetime.now().time().strftime("%H:%M:%S")) + " Sentences loaded!")

print(str(datetime.datetime.now().time().strftime("%H:%M:%S")) + " Working with sentences...")
for i in range(len(all_sentences)):
    print(datetime.datetime.now().time().strftime("%H:%M:%S") + "\t\tFile " + str(i + 1) + "/" + str(len(all_sentences)) + "\t" + )

    #Generate embeddings
    print(str(datetime.datetime.now().time().strftime("%H:%M:%S")) + " Generating embeddings...")
    embeddings = model.encode(all_sentences[i], show_progress_bar="true").tolist()

    #Convert to NumPy array
    print(str(datetime.datetime.now().time().strftime("%H:%M:%S")) + " Converting to NumPy array...")
    data_as_np_array = np.array([all_sentences[i], embeddings])

    #Pickle
    print(str(datetime.datetime.now().time().strftime("%H:%M:%S")) + " Pickling data...")
    with open(pickled_path + r'/' + raw_file_pathes[i].replace('.txt','.pkl'), 'wb') as pickled_file:
        pkl.dump(data_as_np_array, pickled_file)