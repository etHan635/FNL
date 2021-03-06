from tqdm import tqdm
import file_to_text
import os

#Sources location, with all the txt files in here culminating in the full list  of sources
sources = r'Sources'
#Destinations is where txt files will be deposited
destinations = r'Raw Text'

sourcesFiles = os.listdir(sources)

typeNo = 0
for file in sourcesFiles:
    print(file[:file.find('.')])
    with open(sources + r'/' + file, 'r') as links_file:
        #print(links_file.read())
        links = links_file.read().split('\n')
        for i in tqdm(range(len(links))):
            destination = r'Raw Text/' + str(typeNo) + '_' + str(i) + r'.txt'
            file_to_text.url_to_txt_file(links[i], destination)
    typeNo += 1


#file_to_text.url_to_txt_file(r'http://www.gutenberg.org/files/74/74-0.txt', r'Raw Text/74.txt')

