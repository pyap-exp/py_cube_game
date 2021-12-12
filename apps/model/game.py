from db import get_db
import datetime
import json
from sqlalchemy.sql import func


db =get_db()

class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    row_count = db.Column(db.Integer(), nullable=False)
    time = db.Column(db.Integer(), nullable=False)
    date_created = db.Column(db.DateTime(timezone=True), default=datetime.datetime.now())

    def __repr__(self):
        return '<Game %r %r %r  >' % (self.username,self.row_count,self.time)
    def to_json(self):
        return json.dumps({}) 

    @classmethod
    def from_json(cls, json_str):
        json_dict = json.loads(json_str)
        return cls(**json_dict)
    

db.create_all()        