from http import  HTTPStatus
import re
from flask_classful import FlaskView, route
from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from project.models.conyuge import ConyugeModel, DireccionModel

class ConyugeView(FlaskView):
    route_base = '/conyuge'

    # @jwt_required()
    def post(self):
        body = request.get_json()
        email = body['email']

        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            return jsonify({'error' : 'Email invalido'}), HTTPStatus.BAD_REQUEST

        conyuge = ConyugeModel.objects(email=email).first()
        if conyuge:
            return jsonify({'error': 'El usuario ya exite'}), HTTPStatus.OK


        direccion = DireccionModel(
            cp = body['dir']['cp'],
            ciudad = body['dir']['ciudad'],
            colonia = body['dir']['colonia'],
            direccion = body['dir']['direccion']
        )

        conyuge = ConyugeModel(
            esposo = body['esposo'],
            direccion = direccion,
            nombre = body['nombre'],
            apellidos = body['apellidos'],
            curp = body['curp'],
            telefono = body['telefono'],
            email = body['email']

        )
        conyuge.save()
        return jsonify(conyuge), HTTPStatus.CREATED