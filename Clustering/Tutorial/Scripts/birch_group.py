import pandas as pd

all_clusters_path = r'Tutorial/Clusters/0_1.csv'
top_clusters_path = r'Tutorial/Clusters/Top/'

#the number of clusters to obtain
limit = 100

#get all clusters
all_clusters = pd.read_csv(all_clusters_path, delimiter='\t')

#get ids of most numerous clusters
counts = all_clusters.groupby('Cluster').size().sort_values(ascending = False).reset_index(name='Count')
counts_top = counts[:limit]
cluster_ids_top = counts_top['Cluster']


for i in range(len(cluster_ids_top)):
    #get sentences with ID
    sentences = all_clusters.loc[all_clusters['Cluster'] == cluster_ids_top[i]].values.tolist()
    with open (top_clusters_path +  str(i) + '.txt', 'w', encoding='utf-8', newline='') as cluster_file:
        for sentence in sentences:
            cluster_file.write(sentence[1])