Note: 

Clear Migrations and DB
Run Migrations Again:
comment services field on accounts from wildcats project
migrate the two app accounts and services from wildcats
remove comment on services field and makemigrations on accounts

./cleanup.sh
./makemigrations.sh


python manage.py runserver localhost:8000

python manage.py runserver localhost:8080

python manage.py runserver localhost:8001
