from flask import Blueprint, render_template, abort,jsonify,request
import datetime
from jinja2 import TemplateNotFound

import json
from db import get_db
db =get_db()

from apps.model.game import Game
from sqlalchemy.sql import func

simple_page = Blueprint('simple_page', __name__, template_folder='templates')

@simple_page.route('/',methods=['GET'])
def index():
    try:
        return render_template(f'pages/index.html')
    except TemplateNotFound:
        abort(500)
@simple_page.route('/savescore',methods=['GET'])
def save_score():
	user_s = request.args.get('user', 'uknown')
	row_s = request.args.get('row', 9)
	seconds_s = request.args.get('seconds',0)
	game = Game(username=user_s,row_count=row_s,time=seconds_s,date_created=datetime.datetime.now())
	db.session.add(game)
	db.session.commit()

	data = Game.query.with_entities(Game.username,func.min(Game.time)).filter_by(row_count=row_s).group_by(Game.username).order_by(
    func.min(Game.time).asc()).limit(10).all()
	json_data = [[x[0],x[1]] for x in data]
	return jsonify(result=json_data)
 