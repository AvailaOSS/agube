FROM ubuntu:20.04

RUN apt update && apt install -y python3 python3-pip

ENV PYTHONUNBUFFERED 1

WORKDIR /availa-agube

# Install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy code
COPY . .