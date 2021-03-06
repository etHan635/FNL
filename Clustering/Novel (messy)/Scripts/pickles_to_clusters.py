import csv
import pandas as pd
import numpy as np
from sklearn.cluster import Birch
import datetime
import os
import pickle as pkl
from pathlib import Path
from tqdm import tqdm

trained_model_path = r'Trained BIRCH Models/th0.5-bf50-tiny.pkl'
pickled_path = r'Pickled Sentences/All'
cluster_path = r'Clusters/' + str(datetime.datetime.now().strftime("%Y-%m-%d---%H-%M-%S"))
#Make output folder
print(str(datetime.datetime.now().time().strftime("%H:%M:%S")) + " Creating output directory...")
if (not os.path.exists(cluster_path)):
    os.makedirs(cluster_path)

#Load BIRCH model
print(str(datetime.datetime.now().time().strftime("%H:%M:%S")) + " Loading BIRCH model (" + trained_model_path + ")...")
with open(trained_model_path, "rb") as trained_model_file:
    birch_model = pkl.load(trained_model_file)

#Generate clusters
print(str(datetime.datetime.now().time().strftime("%H:%M:%S")) + " Generating clusters for '" + pickled_path + "'...")
with open(cluster_path + '/clusters_all.csv', 'w', encoding='utf-8') as all_clusters_file:
    writer = csv.writer(all_clusters_file, delimiter='\t')
    writer.writerow(['Cluster','Sentence'])
    pickled_file_pathes = os.listdir(pickled_path)
    for i in tqdm(range(len(pickled_file_pathes))):
        with open(pickled_path + r'/' + pickled_file_pathes[i], 'rb') as pickled_file:
            data = pkl.load(pickled_file)
            #column 0 for sentences, column 1 for embeddings
            sentences = data[0].tolist()
            embeddings = data[1].tolist()
            
            cluster_assignments = birch_model.predict(data[1].tolist())
            for j in range(len(sentences)):
                #column 0 for cluster, column 1 for senternce
                writer.writerow([cluster_assignments[j], sentences[j]])
#The End
print(str(datetime.datetime.now().time().strftime("%H:%M:%S")) + " FIN")