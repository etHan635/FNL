import pandas as pd
import os
import tqdm

limit = 100

all_clusters_path = r'Clusters/2021-02-04---12-05-28/clusters_all.csv'
top_clusters_path = all_clusters_path.replace('clusters_all.csv','') + r'Top ' + str(limit)
counts_path = r'Clusters/2021-02-04---12-05-28/counts.csv'


all_counts = pd.read_csv(counts_path, delimiter="\t")

counts_top = all_counts[:limit]

cluster_ids_top = counts_top['Cluster']

if not os.path.exists(top_clusters_path):
    os.makedirs(top_clusters_path)

all_clusters = pd.read_csv(all_clusters_path, delimiter='\t')

for i in range(len(cluster_ids_top)):
    sentences = all_clusters.loc[all_clusters['Cluster'] == cluster_ids_top[i]].values.tolist()
    with open (top_clusters_path + r'/' + str(i) + '.txt', 'w', encoding='utf-8', newline='') as cluster_file:
        for sentence in sentences:
            cluster_file.write(sentence[1])
    

