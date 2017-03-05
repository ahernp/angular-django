angular-django
==============

Angular 2 frontend with Django backend implemention of [ahernp.com](https://ahernp.com).

The website content is mostly stored as markdown in a PostgreSQL database.

Software stack: NPM, Typescript, Webpack.
[Angular 2 with Webpack Project Setup](https://www.youtube.com/watch?v=HTFZPF6iixA&list=PLgGUMhSgtxJyIQ4vI3BzlCzZLHL79Ew6p) videos.

## Development Environment

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

### API Endpoints

* http://localhost:8000/api/core/checkloggedin
* http://localhost:8000/api/pages/read/ahernp-com
* http://localhost:8000/api/feedreader/entries
* http://localhost:8000/api/feedreader/feeds
* http://localhost:8000/api/feedreader/toggleread

Tested on Ubuntu 16.04 with `python fabric` installed.
