# GDPR Table of Content

Scraper and website consisting a Table of content for the REGULATION (EU) 2016/679 OF THE EUROPEAN PARLIAMENT AND OF THE COUNCIL page of the EU - GDPR

## Getting Started

This repository consists of two components. A scraper and a small website to present the Table of Content.

### Prerequisites

To scrape you need NodeJS and to serve the site You require good old PHP. Currently the scraper gets the TOC content from files residing in "/toc-scraper/html" which are downloaded from the EU GDPR site as HTML format.

## Development

### Scraper
- clone the repo
- navigate to the root directory from a terminal
- type "npm run scrape"
- this creates the TOC files that will be included in the website from the folder "/web/dist/inc/parts"

### Website
- clone the repo
- serve the "web/dist" folder with a local LAMP server
- in the gulpfile.js correct  the "proxy" URL to the URL you are serving 
- navigate to the root directory from a terminal
- type "npm run dev"
- this will start a gulp process and open the browser
- edit files in "web/src"

## Deployment

### Website
- copy "/web/dist" folder to your servers public directory.
- rename the config.sample.php file to config.php and edit as necessary
- start serving

## Acknowledgments

* Thanks to all the hard-working guys in the EU for protecting our privacy!
