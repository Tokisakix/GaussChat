init:
	cd front && npm install
	cd app && pip install -r requirements.txt
	cd app && python3 manage.py migrate
	cd app && python3 manage.py createsuperuser

web:
	cd front && npm run dev

run:
	cd app && python3 manage.py runserver