from flask import Flask, render_template
from flask_pymongo import PyMongo
import scrape_mars.py

app = Flask(__name__)

app.config["MONGO_URI"] = 'mongodb://localhost:27017/mars_app'
mongo = PyMongo(app)


@app.route("/")
def index():
    mars_data = mongo.mars.find_all()
    return render_template("index.html", mars_data=mars_data)

@app.route("/scrape")
def scrape():
    mars_data = mongo.mars_data
    mars_data.update({}, mars_data)
    return redirect("/", code=302)

if __name__ == "__main__":
    app.run(debug=True)
