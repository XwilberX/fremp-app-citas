from http import  HTTPStatus
from datetime import datetime
# import locale
# import pytz
from bson import ObjectId
from flask_classful import FlaskView
from flask_mail import Message
from flask import jsonify, request, Response
from bson.json_util import dumps

from project.models.cita import CitaModel
from project.models.user import UserModel
from project.models.conyuge import ConyugeModel
from project import mail

class CitaView(FlaskView):
    route_base = '/cita'

    def index(self):
        citas = CitaModel.objects.aggregate(
            {"$lookup": {
                "from": "user_model",  # Tag collection database name
                "foreignField": "_id",  # Primary key of the Tag collection
                "localField": "esposo",  # Reference field
                "as": "relation",
            }},
            {"$unwind": "$relation"}
        )
        response = dumps(citas)

        return Response(response , mimetype="application/json"), HTTPStatus.OK

    # @jwt_required()
    def get(self, id):

        user =  UserModel.objects(id = ObjectId(id)).first()  #ObjectId(id)
        conyuge = ConyugeModel.objects(esposo= ObjectId(id)).first()
        cita = CitaModel.objects(esposo = ObjectId(id)).first()

        citar = {
            "id" : str(cita.id),
            "esposo" : str(cita.esposo),
            "fechaCreacion" : cita.fechaCreacion,
            "fechacita" : cita.fechacita
        }
        userr = {
            "id" : str(user.id),
            "nombre": str(user.nombre).title(),
            "apellidos": str(user.apellidos).title(),
            "curp": user.curp,
            "telefono": user.telefono,
            "email": user.email,
            "cp" : user.direccion.cp,
            "ciudad" : user.direccion.ciudad,
            "colonia" : user.direccion.colonia,
            "direccion" : user.direccion.direccion
        }
        conyuger = {
            "id": str(user.id),
            "nombre": str(conyuge.nombre).title(),
            "apellidos": str(conyuge.apellidos).title(),
            "curp": conyuge.curp,
            "telefono": conyuge.telefono,
            "email": conyuge.email,
            "cp": conyuge.direccion.cp,
            "ciudad": conyuge.direccion.ciudad,
            "colonia": conyuge.direccion.colonia,
            "direccion": conyuge.direccion.direccion
        }

        return jsonify(citar, userr, conyuger), HTTPStatus.OK

    # @jwt_required()
    def post(self):
        body = request.get_json()
        id = body['esposo']


        cita = CitaModel (
            esposo = body['esposo'],
            conyuge = body['conyuge'],
            fechacita = body['fechacita']
        )
        cita.save()

        user = UserModel.objects(id=ObjectId(id)).first()
        email = user.email
        nombreC = str(user.nombre + ' ' + user.apellidos).title()
        # locale.setlocale(locale.LC_TIME, "es_MX")
        # MX = pytz.timezone('America/Mexico_City')
        fecha = datetime.strptime(body['fechacita'], '%Y-%m-%d %H:%M:%S').date().strftime("%d %B, %Y")
        hora = datetime.strptime(body['fechacita'], '%Y-%m-%d %H:%M:%S').time().strftime("%I %p")

        msg = Message('Registro civil del Estado de Chiapas', sender='isback592@gmail.com', recipients=[email])
        msg.html = f"<h2>Cita agendada por {nombreC}</h2>\n" \
                   f"<p>Su cita a sido agendada para {fecha} a las {hora}</p>"
        mail.send(msg) 


        return jsonify(cita), HTTPStatus.CREATED