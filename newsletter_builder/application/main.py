import os
import json

from newsletter_builder.infrastructure import Config
from newsletter_builder.infrastructure import docx_to_newsitems
from newsletter_builder.domain import TextAnalyser


configfile = os.path.join(os.path.dirname(__file__), 'config.ini')
print('[newsletter_builder] Reading config from {:s}'.format(configfile))
config = Config(configfile)


# STEP 1: read docx and convert to structured documents
print('[newsletter_builder] Converting docx files to json')
input_folder = config['paths']['input_docs']
filenames = [
    os.path.join(input_folder, f)
    for f in os.listdir(input_folder)
    if not f.startswith('~') and f.endswith('.docx')
]
newsitems = []
for filename in filenames:
    newsitems += docx_to_newsitems(filename)


# STEP 2: train on this corpus
print('[newsletter_builder] Doing text analysis')
analyser = TextAnalyser(newsitems)

# STEP 3: add tags and importance for the newsitems
output_filename = os.path.join(config['paths']['output_json_folder'], 'news.json')
print('[newsletter_builder] Saving results to json : {:s}'.format(output_filename))
newsitems = analyser.get_corpus()
with open(output_filename, 'w') as f:
    json.dump(newsitems, f, indent=3)
