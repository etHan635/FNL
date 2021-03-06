import numpy as np
from sklearn.cluster import Birch
import sys
import pickle as pkl
from tqdm import tqdm

#Set parameters
n_clusters = 100
threshold=0.5
branching_factor=50

#directories
training_data_path = r'Tutorial/Embeddings/0_1.pkl'
trained_model_path = r'Tutorial/Models/model.pkl'

#increase the system recursion limit to handle the algorithm!
sys.setrecursionlimit(10**6)

#Load model
birch_model = Birch(n_clusters = n_clusters, threshold=threshold, branching_factor=branching_factor)

#Train model
with open(training_data_path, 'rb') as training_file:
    #Load data
    data = pkl.load(training_file)

    #we stored the embeddings in index '1' earlier
    embeddings = data[1].tolist()
    embeddings = np.array(embeddings)

    #Train model
    birch_model.partial_fit(embeddings)

    #Checkpoint in case of crash
    with open(trained_model_path, 'wb') as model_file:
        pkl.dump(birch_model, model_file)
