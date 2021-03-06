import csv
import pandas as pd
import numpy as np
from sklearn.cluster import Birch
import pickle as pkl

trained_model_path = r'Tutorial/Models/model.pkl'
sents_embeddings_path = r'Tutorial/Embeddings/0_1.pkl'
cluster_path = r'Tutorial/Clusters/0_1.csv'

#Load BIRCH model
with open(trained_model_path, "rb") as trained_model_file:
    birch_model = pkl.load(trained_model_file)

#Generate clusters
with open(cluster_path, 'w', encoding='utf-8') as all_clusters_file:
    writer = csv.writer(all_clusters_file, delimiter='\t')
    writer.writerow(['Cluster','Sentence'])
    
    #Get sentences and embeddings
    with open(sents_embeddings_path, 'rb') as sents_embeddings_file:
        data = pkl.load(sents_embeddings_file)
        #column 0 for sentences, column 1 for embeddings
        sentences = data[0].tolist()
        embeddings = data[1].tolist()
        
        cluster_assignments = birch_model.predict(data[1].tolist())
        for j in range(len(sentences)):
            #column 0 for cluster, column 1 for senternce
            writer.writerow([cluster_assignments[j], sentences[j]])
        