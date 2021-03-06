import requests
import os
from flask import Flask, request
# Enable CORS
# pip install flask-cors

from flask_cors import CORS

#pipenv install python-dotenv
from dotenv import load_dotenv

from mongo_client import insert_test_document

app = Flask(__name__)
CORS(app)

load_dotenv(dotenv_path="./.env.local")
UNSPLASH_URL = "https://api.unsplash.com/photos/random"
UNSPLASH_KEY = os.environ.get("UNSPLASH_KEY", "")
DEBUG = bool(os.environ.get("DEBUG", True))

# check error
if not UNSPLASH_KEY:  # If key is empty
    raise EnvironmentError(
        "Please create .env.local file and insert UNSPLASH_KEY")

# Enable debug mode
app.config["DEBUG"] = DEBUG

insert_test_document()

@app.route("/new-image")
def new_image():

    # read the word next to query ex" /new-image?query="car"
    word = request.args.get("query")
    # Construct the headers based on UNSPLASH documentation
    headers = {
        "Accept-Version": "v1",
        "Authorization": "Client-ID " + UNSPLASH_KEY,
    }
    # params to set in the request
    params = {
        "query": word
    }
    # Get method
    response = requests.get(url=UNSPLASH_URL, headers=headers, params=params)
    data = response.json()
    return data


# Use this to run flask in terminal by python main.py command
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
