from io import StringIO, BytesIO
from typing import Any
from pathlib import Path
import urllib.request 

def file_or_url(pathfilename:str) -> Any:
    """
    Reurn filepath given local file or URL.
    Args:
        pathfilename:

    Returns:
        filepath odject istance

    """
    try:
        fp = open(pathfilename, mode="rb")  # file(path, 'rb')
    except:
        pass
    else:
        url_text = urllib.request.urlopen(pathfilename).read()
        fp = BytesIO(url_text)
    return fp

def unicode_8_to_text(text: str) -> str:
    return text.decode("utf-8", "replace")
    
def url_to_txt_file(source: str, destination: str):
    gutenberg_text =  urllib.request.urlopen(source).read()
    gutenberg_text = unicode_8_to_text(gutenberg_text)
    #print('{}: size: {:g} \n {} \n'.format(0, len(gutenberg_text) ,gutenberg_text[:]))
    with open(destination, 'w', encoding='utf-8') as file:
        file.write(gutenberg_text)
