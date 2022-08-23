FROM python:3.9
LABEL maintainer="educationalresources.tech"
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /educational_resources_technology
COPY requirements.txt /educational_resources_technology/
RUN pip install -r requirements.txt
COPY . /educational_resources_technology/

VOLUME /educational_resources_technology
WORKDIR /educational_resources_technology

COPY ./start.sh /usr/local/bin/

ENTRYPOINT ["/usr/local/bin/start.sh"]