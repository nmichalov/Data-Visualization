#!/usr/bin/env python

from gensim import corpora, models, similarities
import os
import re
import pymongo

"""
This is a really simple script for converting a directory full of pre-processed 
web pages into a set of topic model representations of those web pages, and then
entering the topic models and URLs of those web pages into a MongoDB collection.
It assumes that each web page is saved in a file whose name is the pages url, but with
each '/' replaced with a single space.  I don't really expect anyone to use this
script, even if they're interested in the broader project in which it's used, but I
felt I should include it in the git repo for completeness.
"""

def yield_page_text(text_dir):
    for page_file in os.listdir(text_dir):
        content = open(text_dir+'/'+page_file, 'r')
        page_content = content.read()
        content.close()
        yield page_content

def get_page_urls(text_dir):
    page_urls = []
    for page_file in os.listdir(text_dir):
        page_file = re.sub('\s', '/', page_file)
        page_urls.append(page_file)
    return page_urls


if __name__ == '__main__':
    target_directory = 'OldData'
    dictionary = corpora.Dictionary(line.split() for line in yield_page_text(target_directory))
    corpus = [dictionary.doc2bow(text) for text in yield_page_text(target_directory)]
    corpus_lda_model = models.ldamodel.LdaModel(corpus, id2word=dictionary, num_topics=10)
    lda_corpus = corpus_lda_model[corpus]
    for entry in corpus_lda_model.show_topics(topics=-1, topn=30):
        entry = sorted(entry.split('+'))
        print entry
#    page_urls = get_page_urls(target_directory)
#    connection = pymongo.Connection()
#    db = connection.data_visualization
#    j = 0
#    for topic_model in lda_corpus:
#        topic_entry = {'url': page_urls[j],
#                       'topics': topic_model}
#        db.topics.save(topic_entry)
#        j += 1
