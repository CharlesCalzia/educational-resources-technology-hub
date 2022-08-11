FROM python:3.9
LABEL maintainer="educationalresources.tech"

# set environment variables  
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1  


RUN pip install --upgrade pip  

RUN pip install -r requirements.txt

EXPOSE 8000

# CMD python manage.py runserver  