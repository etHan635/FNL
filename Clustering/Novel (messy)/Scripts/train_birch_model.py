import numpy as np
from sklearn.cluster import Birch
import os
import sys
import math
import datetime
import pickle as pkl
from tqdm import tqdm

#Set parameters
threshold=.5
branching_factor=50
training_sample_size=-1 # -1 for Use all available data, positive for use that many files

#directories
training_data_path = r'Pickled Sentences/Train'
trained_models_path = r'Trained BIRCH Models'


trained_model_name = r'birch_model_th' + str(threshold) + '_br' + str(branching_factor) + '_tss' + str(training_sample_size) + '.pkl'
model_path = trained_models_path + r'/' + trained_model_name

sys.setrecursionlimit(10**6)

#Load model
print(str(datetime.datetime.now().time().strftime("%H:%M:%S")) + " Loading " + trained_model_name + "...")
birch_model = Birch(n_clusters = 1000, threshold=threshold, branching_factor=branching_factor)
print(str(datetime.datetime.now().time().strftime("%H:%M:%S")) + " Model loaded!")

#Train model
print(str(datetime.datetime.now().time().strftime("%H:%M:%S")) + " Training model:")
#Load files
training_data_pathes = os.listdir(training_data_path)
for i in tqdm(range(len(training_data_pathes))):
    #print(str(datetime.datetime.now().time().strftime("%H:%M:%S")) + " File " + str(i + 1) " of " + str(len(training_data_pathes)))
    with open(training_data_path + r'/' + training_data_pathes[i], 'rb') as training_file:
        #Load data
        data = pkl.load(training_file)
        embeddings = data[1].tolist()
        embeddings = np.array(embeddings)

        #Train model
        birch_model.partial_fit(embeddings)

        #Checkpoint in case of crash
        with open(model_path, 'wb') as model_file:
            pkl.dump(birch_model, model_file)




# def trainBirchModel(threshold, bf, model_size):
#     #Get paths to all files needed
#     model_name = "th" + str(threshold) + "-bf" + str(bf) + "-" + model_size
#     trained_models_folder_path = str(Path(__file__).parents[2] / "trained_models")
#     pickled_sentences_training_path = str(Path(__file__).parents[2] / ("pickled_sentences/training/" + model_size))
#     model_out_path = trained_models_folder_path + "\\" + model_size + "\\" + model_name + ".pkl"

#     #Increase recursion limit
#     sys.setrecursionlimit(10**6)

#     #Load model
#     print(str(datetime.datetime.now().time().strftime("%H:%M:%S")) + " Training " + model_name + "...")
#     brc = Birch(n_clusters = None, threshold=threshold, branching_factor=bf)

#     #For each pickled_sentences file
#     for filename in os.listdir(pickled_sentences_training_path):
#         print(str(datetime.datetime.now().time().strftime("%H:%M:%S")) + "\t\t Loading " + filename + "...")
#         with open(pickled_sentences_training_path + "\\" + filename, "rb") as f:
#             #Load the data
#             data = pkl.load(f)

#             #Get all embeddings in a list
#             embeddings = []
#             for i in range(len(data)):
#                 embeddings.append(data[i][3])
#             embeddings = np.array(embeddings)

#             #Train the BIRCH model using the embeddings
#             brc.partial_fit(embeddings)

#             #Save the model at this point - 
#             # *****I did this because my models were obviously became too big because of the amount of training data, so they crashed before finishing training. So this was like a checkpoint*****
#             print(str(datetime.datetime.now().time().strftime("%H:%M:%S")) + "\t\t\t\t Saving model...")
#             with open(model_out_path, "wb") as model_out_file:
#                 pkl.dump(brc, model_out_file)
            
# trainBirchModel(0.5, 50, "tiny")
