from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from decouple import config

DB_CONNECTION = config('DB_CONNECTION')
DB_USER = config('DB_USER')
DB_PASSWORD = config('DB_PASSWORD')
DB_NAME = config('DB_NAME')


app = Flask(__name__)

def get_db():
	app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://%s:%s@%s/%s"%(DB_USER, DB_PASSWORD, DB_CONNECTION, DB_NAME)
	app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
	db_rea = SQLAlchemy(app)
	return db_rea
