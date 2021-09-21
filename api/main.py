from flask import Flask
 
app = Flask(__name__)

@app.route("/")
def hello():
     return "Hello me!"

#Use this to run flask in terminal by python main.y command
if __name__ == "__main__":
     app.run(host="0.0.0.0", port=5050)