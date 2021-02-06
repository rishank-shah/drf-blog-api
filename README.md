# drf-blog-api

### Task: Create a blogging portal using Django REST framework comprising of the following features:
- [x] Users should be able to log in.
- [x] Logged-in users should be able to write a blog(text only).	
- [x] Logged-in users should be able to view anyone’s blog and comment on it.
- [x] Logged-in users should be able to delete their own blog.		
- [x] Minimal Frontend. (Won’t be evaluated).		


### Steps To run the project:
#### Requirements to run project are [node](https://nodejs.org/en/), [python3.8.2(32-bit)](https://www.python.org/downloads/release/python-382/), [virtualenv](https://virtualenv.pypa.io/en/latest/installation.html), [git-bash](https://git-scm.com/downloads)
#### NOTE: If running on windows please use git-bash
```
git clone https://github.com/rishank-shah/drf-blog-api.git
cd drf-blog-api
cd frontend-blog
npm install
cp .env.example .env
npm run build
cd ../backend-blog
virtualenv venv --python=python3.8.2
source venv/Scripts/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

### If all commands work site will be on [http://localhost:8000](http://localhost:8000)
### API documentation is at [http://localhost:8000/api-docs/](http://localhost:8000/api-docs/)