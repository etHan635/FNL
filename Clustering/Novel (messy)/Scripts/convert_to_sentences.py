import re
import spacy
import os
from tqdm import tqdm
import datetime

raw_path = r'Raw Text'
final_path = r'Final Text'

print(datetime.datetime.now().time().strftime("%H:%M:%S")) + " Obtaining filepathes...")
raw_file_pathes = os.listdir(raw_path)

#Load spacy NLP model
print(datetime.datetime.now().time().strftime("%H:%M:%S")) + " Loading NLP model...")
nlp = spacy.load("en_core_web_lg")
nlp.max_length = 10000000


#Iterate through all files
print(datetime.datetime.now().time().strftime("%H:%M:%S")) + " Obtaining sentences...")
for i in tqdm(range(len(raw_file_pathes))):
    with open(raw_path + r'/' + raw_file_pathes[i], 'r', encoding='utf-8') as book_file:
        book_filename = raw_file_pathes[i]
        book_data = book_file.read()

        #do some simple cleaning (not enough to justify its own step)
        book_data = book_data.replace(u'\n', ' ')
        book_data = book_data.replace(u'\t', '')
        book_data = book_data.replace('_', '')
        book_data = re.sub(' +', ' ', book_data)

        #Use spaCy to construct sentences
        book_sentences = list(nlp(book_data).sents)

        #Save sentences
        destination_path = final_path + r'/' + book_filename
        with open(destination_path, 'w', encoding='utf-8') as destination_file:
            for j in range(len(book_sentences)):
                destination_file.write(str(book_sentences[j]) + u'\n')