FROM python:3.9

LABEL maintainer="ffrannabril@gmail.com"

ENV PYTHONUNBUFFERED 1

# Creating working directory
RUN mkdir /availa-agube

# All next commands here
WORKDIR /availa-agube

# Copying requirements
COPY requirements.txt .

RUN pip install -r requirements.txt

# Copying requirements
COPY . .