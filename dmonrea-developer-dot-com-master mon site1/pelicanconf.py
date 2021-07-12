#!/usr/bin/env python
# -*- coding: utf-8 -*- #

AUTHOR = 'DM'
SITENAME = 'Vitamine'
SITESUBTITLE = 'Agile'
SITEURL = ''

PATH = 'content'

TIMEZONE = 'Europe/Paris'
THEME = 'denisetheme'

DEFAULT_LANG = 'en' 
INDEX_SAVE_AS = 'blog.html'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None
LOAD_CONTENT_CACHE = False

# Blogroll
LINKS = (('Collective Genius', 'https://www.collectivegenius.fr/'),
         ('Insuffle', 'https://www.insuffle.com/'),
         ('Jinja2', 'https://palletsprojects.com/p/jinja/'),)

# Social widget
SOCIAL = (('« L’évolution ne connaît pas la marche arrière. » – Boris Cyrulnik', '#'),
          ('Another social link', '#'),)

DEFAULT_PAGINATION = 10

# Uncomment following line to document-relative URLs when developing
#RELATIVE_URLS = True