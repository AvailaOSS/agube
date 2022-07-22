FROM ubuntu:20.04

# Python
RUN apt update \
    && apt install -y --no-install-recommends python3 python3-pip \
    && rm -rf /var/lib/apt/lists/*

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

# Project user
RUN useradd -U availa

# Project directory
WORKDIR /availa-agube

# Dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Log & file storage directories
RUN install -d -m 0755 -o availa -g availa logs /mnt/availa-agube/data

# Switch user
USER availa:availa

# Copy code
COPY --chown=availa:availa . .

# guinicorn workers = (2 * CPU Cores) + 1
CMD gunicorn --bind 0.0.0.0:8000 --workers 3 --log-level debug agube.wsgi