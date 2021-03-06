import re
import spacy

raw_path = r'Tutorial/Manually Cleaned Text/0_1.txt'
final_path = r'Tutorial/Final Text/0_1.txt'

#Open the source file, which has already had the metadata stripped manually
with open(raw_path, 'r', encoding='utf-8') as book_file:
    book_data = book_file.read()

    #do some simple cleaning
    book_data = book_data.replace(u'\n', ' ')
    book_data = book_data.replace(u'\t', '')
    book_data = book_data.replace('_', '')
    book_data = re.sub(' +', ' ', book_data)

    #Load up spaCy
    nlp = spacy.load("en_core_web_lg")
    nlp.max_length = 10000000
    #Use spaCy to construct sentences from the block of text
    book_sentences = list(nlp(book_data).sents)

    #Save sentences
    with open(final_path, 'w', encoding='utf-8') as destination_file:
        for j in range(len(book_sentences)):
            destination_file.write(str(book_sentences[j]) + u'\n')
            print(book_sentences[j])
