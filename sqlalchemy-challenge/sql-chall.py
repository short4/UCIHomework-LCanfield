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
        f"Hawaii Climate app" + "<br/>" +
        "<hr>" +
        f"Available Routes:" + "<br/>" +
        "<hr>" +
        f"/api/v1.0/precipitation" + "<br/>"
        f"/api/v1.0/stations" + "<br/>"
        f"/api/v1.0/tobs" + "<br/>"
        f"/api/v1.0/<start>" + "<br/>"
        f"/api/v1.0/<start>/<end>"
    )

@app.route("/api/v1.0/precipitation")
def precipitation():

    session = Session(engine)
    results = session.query(measurement.date, measurement.prcp).all()
    session.close()
    
    prcp = {}
    for t in results:
        prcp[t[0]] = t[1]
    return jsonify(prcp)


@app.route("/api/v1.0/stations")
def stations():

    session = Session(engine)
    results = session.query(measurement.date, measurement.station).all()
    session.close()

    station = {}
    for t in results:
        station[t[0]] = t[1]
    return jsonify(station)

@app.route("/api/v1.0/tobs")
def tobs():

    session = Session(engine)
    results = session.query(measurement.date, measurement.tobs).all()
    session.close()
    
    tobs = {}
    for t in results:
        tobs[t[0]] = t[1]
    return jsonify(tobs)

@app.route("/api/v1.0/<start>" )
def start():

    session = Session(engine)
    results = session.query(measurement.date, func.min(measurement.tobs), func.avg(measurement.tobs), func.max(measurement.tobs)).all()
    session.close()

    
    start = {}
    for t in results:
        tobs[t[0]] = t[1]
    return jsonify(tobs)

if __name__ == "__main__":
    app.run(debug=True)
