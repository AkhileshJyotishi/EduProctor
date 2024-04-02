import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
import time
import torch
from transformers import T5ForConditionalGeneration,T5Tokenizer
import random
import spacy
import zipfile
import os
import json
from sense2vec import Sense2Vec
import requests
from collections import OrderedDict
import string
import pke
import nltk
from nltk import FreqDist
nltk.download('brown')
nltk.download('stopwords')
nltk.download('popular')
from nltk.corpus import stopwords
from nltk.corpus import brown
from similarity.normalized_levenshtein import NormalizedLevenshtein
from nltk.tokenize import sent_tokenize
from flashtext import KeywordProcessor








def tokenize_sentences(text):
    sentences = [sent_tokenize(text)]
    sentences = [y for x in sentences for y in x]
    # Remove any short sentences less than 20 letters.
    sentences = [sentence.strip() for sentence in sentences if len(sentence) > 20]
    return sentences


