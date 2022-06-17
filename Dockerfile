FROM ubuntu:20.04

RUN apt update && apt install -y python3 python3-pip

ENV PYTHONUNBUFFERED 1

WORKDIR /availa-agube

# Install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy code
COPY . .

# (2 Workers * CPU Cores) + 1
# ---------------------------
# For 1 core  -> (2*1)+1 = 3
# For 2 cores -> (2*2)+1 = 5
# For 4 cores -> (2*4)+1 = 9
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "3", "--log-file" "error_logs.log" "--log-level" "debug" "agube.wsgi"]