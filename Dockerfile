FROM python:3.9
LABEL maintainer="educationalresources.tech"

WORKDIR /educational_resources_technology
COPY . /educational_resources_technology/
RUN pip install -r requirements.txt

EXPOSE 8000