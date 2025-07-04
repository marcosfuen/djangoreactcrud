FROM python:3.13-slim

ADD ./requirements.txt /tmp/requirements.txt
RUN pip install --no-cache-dir -q gunicorn
RUN pip install --no-cache-dir -r /tmp/requirements.txt

WORKDIR /usr/src/app

COPY . .

RUN python manage.py collectstatic --noinput

EXPOSE 8000
# CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "3", "djangoreactcrud.wsgi:application"]
