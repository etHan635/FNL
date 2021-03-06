from sentence_transformers import SentenceTransformer
from tqdm import tqdm
import pickle as pkl
import pandas as pd
import numpy as np
import datetime
import os

file_path = r'Pickled Sentences/All/0_0.pkl'

with open(file_path, 'rb') as pickled:
    data = pkl.load(pickled)
    print(data[0][104])
