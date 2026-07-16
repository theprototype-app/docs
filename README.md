
Windows Python install
Download latest embeded
https://www.python.org/downloads/windows/
https://bootstrap.pypa.io/get-pip.py
set PATH=%PATH%;

Configuring locally

``` bash
python -m virtualenv ./venv
.\venv\Scripts\activate.bat
pip install mkdocs-material mkdocs-git-revision-date-plugin
mkdocs serve
gh-deploy --force
```