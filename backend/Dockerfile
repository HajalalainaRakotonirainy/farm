FROM python:latest
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 8000
# COPY ./myproject/ .
#CMD [ "python", "manage.py", "runserver" ]