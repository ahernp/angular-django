# angular-django

Angular 2 frontend with Django backend implemention of [ahernp.com](https://ahernp.com).

## Software

* Frontend – NPM, Typescript & Webpack.
* Backend – Ubuntu, nginx, uWSGI & Django.

## Architecture

The website content is mostly stored as Markdown text in a PostgreSQL database.
Access to this data is provided via endpoints implemented by a Django backend.

Most of the application logic resides in an Angular 2 single page application run in the browser.

When the site is first visited, the Angular 2 application is downloaded and runs to render the initial page.
All the other page content is downloaded in the background so that clicks on internal links can be serviced by the SPA without further recourse to the backend.

Feedreader, an RSS reader is also available. Its content is also downloaded in the background and the server polled hourly to check for updates.

Logged in users gain access to additional controls to edit the markdown content and feedreader subscriptions.

There are also some text manipulation tools, implemented in Javascript which merely process text input in the local browser session.

A dashboard page is also available showing the current versions of software and recent log entries for the application.

## Development Environment

Tested on Ubuntu 16.04 with `python fabric` installed.

### Setup

1. Get source code: `git clone https://github.com/ahernp/angular-django.git`
1. Create Python virtual environment: `mkvirtualenv ad`
1. Change to `angular` directory: `angular-django/angular'`
1. Full development environment setup: `fab setup:init`

### Run

1. In one terminal, start the Django runserver: `fab runserver`
1. In another terminal, build the client side application: `npm run build`
1. Visit http://localhost:8000/
1. Run unit tests: `npm test`
1. Run end to end tests using [Selenium IDE](http://www.seleniumhq.org/projects/ide/). The test case is in the project root directory in a file called `sanityCheck.selenium`.

### Example API Endpoints

* http://localhost:8000/api/core/checkloggedin
* http://localhost:8000/api/pages/read/ahernp-com
* http://localhost:8000/api/feedreader/entries
* http://localhost:8000/api/feedreader/feeds
* http://localhost:8000/api/feedreader/toggleread

