from collections import Counter
import re
from math import log


class TextAnalyser:

    def __init__(self, corpus):
        self.corpus = corpus
        self.parse_words()
        self.define_stopwords()
        self.add_tags()
        self.strip_extra_info()

    def get_corpus(self):
        return self.corpus

    def get_taglist(self):
        return [word for word in sorted(self.document_counter.keys()) if word not in self.stopwords]

    def parse_words(self):
        pattern = r"(\w+)"
        all_words = []
        self.document_counter = Counter()
        for item in self.corpus:
            # On compte trois fois les mots du titre..
            text = item['rawhtml'] + (" " + item['title']) * 3
            words = re.findall(pattern, text.lower())
            all_words += words
            item['words'] = words
            for word in set(words):
                self.document_counter[word] += 1
        self.counted_words = Counter(all_words)

    def define_stopwords(self):
        """ ceux qui sont plus fréquents que "python" """
        self.stopwords = []
        for mot, n in self.counted_words.most_common(100):
            if mot == "python":
                break
            self.stopwords.append(mot)

    def add_tags(self):
        for item in self.corpus:
            item['tags'] = []
            counted = Counter(item['words'])
            for mot, n in counted.items():
                if mot in self.stopwords:
                    continue
                term_frequency = float(n)
                document_frequency = float(self.document_counter[mot]) / len(self.corpus)
                tfidf = (1 + log(term_frequency)) * log(1. / document_frequency)
                item['tags'].append({
                    'tag': mot,
                    'importance': tfidf
                })

    def strip_extra_info(self):
        for item in self.corpus:
            del(item['words'])
