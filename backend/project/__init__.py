from flask import Flask, jsonify
from flask_mongoengine import MongoEngine
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_mail import Mail

app = Flask(__name__, static_folder="build", static_url_path="/")

DB_URI = "mongodb+srv://wilber:wil99@cluster0.2k71m.mongodb.net/registro?retryWrites=true&w=majority"

app.config["MONGODB_HOST"] = DB_URI

mail_settings = {
    "MAIL_SERVER": 'smtp.gmail.com',
    "MAIL_PORT": 465,
    "MAIL_USE_TLS": False,
    "MAIL_USE_SSL": True,
    "MAIL_USERNAME": 'isback592@gmail.com',
    "MAIL_PASSWORD": 'Alegria99'
}

app.config["JSON_SORT_KEYS"] = False

CORS(app)

db = MongoEngine()
db.init_app(app)
mail = Mail()
app.config.update(mail_settings)
mail.init_app(app)



jwt = JWTManager(app)

app.config['JWT_SECRET_KEY'] = 'SECRET_KEY'

@app.route("/<a>")
def react_routes(a):
    return app.send_static_file("index.html")


@app.route("/")
def react_index():
    return app.send_static_file("index.html")



from project.views.user import UserView
UserView.register(app, route_prefix='/api')

from project.views.jwt import TokenView
TokenView.register(app, route_prefix='/api')

from project.views.conyuge import  ConyugeView
ConyugeView.register(app, route_prefix='/api')

from project.views.cita import CitaView
CitaView.register(app, route_prefix='/api')

from project.models.jwt import InvalidToken
@jwt.token_in_blocklist_loader
def check_if_blacklisted_token(self, jwt_payload):
    jti = jwt_payload['jti']
    return InvalidToken.is_invalid(jti)