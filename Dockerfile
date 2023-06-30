FROM python:3.9
LABEL maintainer="educationalresources.tech"

WORKDIR /educational_resources_technology
COPY . /educational_resources_technology/
RUN pip install -r requirements.txt

ENV DEBUG=0
ENV RESOURCES_IMAGES_PATH="educational_resources_technology/home/static/images/resources/"

EXPOSE 8000