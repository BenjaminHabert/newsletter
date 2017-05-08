
class TextAnalyser:

    def __init__(self, corpus):
        self.corpus = corpus
        self.add_tags()

    def get_corpus(self):
        return self.corpus

    def add_tags(self):
        for item in self.corpus:
            item['tags'] = []
