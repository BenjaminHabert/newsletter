import re
import os
import hashlib
import mammoth


def find_date(s):
    try:
        pattern = '(\d{4}).(\d{2}).(\d{2})'
        return '-'.join(re.search(pattern, s).groups())
    except AttributeError:
        return None


def find_title(raw, balise, text):
    if balise.startswith('h'):
        return text
    if balise == "p":
        try:
            pattern = r"^<strong>(.+?)</strong>$"
            result = re.match(pattern, text)
            return result.group(1)
        except Exception:
            pass
    return None


def strip_images(html):
    """ clean_html, image_list = strip_images(newsitem['rawhtml']) """
    # removing images
    pattern = r'(<p>)?<img src=".+?" />(</p>)?'
    without_images, _ = re.subn(pattern, '', html)
    # removing empty paragraphs
    pattern = r'<p></p>'
    without_images, _ = re.subn(pattern, '', without_images)
    # getting list of image names
    pattern = r'<img src="(.+?)" />'
    image_list = re.findall(pattern, html)
    return without_images, image_list


def conclude_newsitem(newsitem):
    clean_html, image_list = strip_images(newsitem['rawhtml'])
    newsitem['rawhtml'] = clean_html
    newsitem['images'] = image_list
    return newsitem


def html_to_newsitems(html):
    pattern = r"(<(?P<balise>.+?)>(.+?)</(?P=balise)>)"
    result = re.findall(pattern, html)
    date = find_date(result[0][2])
    print(date)
    news = []
    newsitem = None
    for raw, balise, text in result[1:]:
        title = find_title(raw, balise, text)
        if title:
            if newsitem:
                news.append(conclude_newsitem(newsitem))
            newsitem = {
                'title': title,
                'date': date,
                'rawhtml': ""
            }
        elif newsitem:
            newsitem['rawhtml'] += raw
    if newsitem:
        news.append(conclude_newsitem(newsitem))
    return news


def build_converter(output_image_folder):
    def image_converter(image):
        with image.open() as image_bytes:
            image_data = image_bytes.read()
            image_hash = hashlib.new("sha1", image_data).hexdigest()
            image_extension = image.content_type.split('/')[1]
            image_name = image_hash + "." + image_extension
            image_path = os.path.join(output_image_folder, image_name)
            if not os.path.exists(image_path):
                with open(image_path, 'wb') as f:
                    f.write(image_data)
        return {
            "src": image_name
        }
    return image_converter


def docx_to_newsitems(filename, output_image_folder):
    image_converter = build_converter(output_image_folder)
    with open(filename, "rb") as docx_file:
        result = mammoth.convert_to_html(
            docx_file,
            convert_image=mammoth.images.img_element(image_converter))
        html = result.value  # The generated HTML
        messages = result.messages  # Any messages, such as warnings during conversion
        structured = html_to_newsitems(html)
        return structured
