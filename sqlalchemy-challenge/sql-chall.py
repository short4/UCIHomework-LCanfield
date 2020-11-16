#Dependencies
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

#Set up Database
engine = create_engine("sqlite:///Resources/hawaii.sqlite")

#Reflect db
Base = automap_base()
Base.prepare(engine, reflect=True)

#Save reference to the table 
measurement = Base.classes.measurement

#Flask

app = Flask(__name__)

# Home 
@app.route("/")
def home():
    #List available Routes 
    return (
        f"Welcome to my Climate app" + "<br/>" +
        "<hr>" +
        f"Available Routes:" + "<br/>" +
        "<hr>" +
        f"/api/v1.0/precipitation" +
        f"/api/v1.0/stations" +
        f"/api/v1.0/tobs" +
        f"/api/v1.0/<start>" +
        f"/api/v1.0/<start>/<end>"
    )

@app.route("/api/v1.0/precipitation")
def precipitation():

    session = Session(engine)

    results = session.query(measurement.date, measurement.prcp).all()
    
    session.close()
    # print(results)
    # return jsonify(results)
    
    prcp = {}
    for t in results:
        prcp[t[0]] = t[1]
    return jsonify(prcp)


    # print(f"Welcome to my Climate app")<br/>
    # <hr>
    # print(f"Available Routes:")<br/>
    # <hr>
    # print(f"/api/v1.0/precipitation")
    # print(f"/api/v1.0/stations")
    # print("/api/v1.0/tobs")
    # )


if __name__ == "__main__":
    app.run(debug=True)
