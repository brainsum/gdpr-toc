# Project Title

Scraper and website consisting a Table of content for the REGULATION (EU) 2016/679 OF THE EUROPEAN PARLIAMENT AND OF THE COUNCIL page of the EU - GDPR

## Getting Started

This repository consists of two components. A scraper and a small website to present the Table of Content.

### Prerequisites

To scrape you need NodeJS and to serve the site You require good old PHP. Currently the scraper gets the TOC content from files residing in "/toc-scraper/html" which are downloaded from the EU GDPR site as HTML format.

## Deployment

### The scraper
- clone the repo
- navigate to toc-scraper with a terminal
- type node index
- this creates the TOC files that will be included in the website ubder the folder "/web/dist/inc/parts"

### Website
- copy "/web/dist" folder to your servers public directory.
- rename the config.sample.php file to config.php and edit as necessary
- start serving

## Acknowledgments

* Thanks to all the hard-working guys in the EU protecting our privacy!
