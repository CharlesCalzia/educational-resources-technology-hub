FROM python:3.9
LABEL maintainer="educationalresources.tech"

COPY . /educational_resources_technology/
RUN pip install -r /educational_resources_technology/requirements.txt

ENV DEBUG=0
ENV RESOURCES_IMAGES_PATH="educational_resources_technology/home/static/images/resources/"

EXPOSE 8000