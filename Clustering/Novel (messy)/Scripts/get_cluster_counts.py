import pandas as pd
import os
import tqdm

all_clusters_path = r'Clusters/2021-02-04---12-05-28/clusters_all.csv'
counts_path = r'Clusters/2021-02-04---12-05-28'

#get all clusters
all_clusters = pd.read_csv(all_clusters_path, delimiter='\t')
counts = all_clusters.groupby('Cluster').size().sort_values(ascending = False).reset_index(name='Count')
counts.to_csv(counts_path + r'/counts.csv', sep='\t', index=None)

