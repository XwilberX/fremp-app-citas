from http import  HTTPStatus
import re
from flask_classful import FlaskView, route
from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from project.models.user import UserModel, DireccionModel

class UserView(FlaskView):
    route_base = '/user'

    @jwt_required()
    def index(self):
        users = UserModel.objects()
        return jsonify(users), HTTPStatus.OK

    # @jwt_required()
    def get(self, id):
        user = UserModel.objects(id=id).first()
        userr = {
            "id": str(user.id),
            "nombre": str(user.nombre).title(),
            "apellidos": str(user.apellidos).title(),
            "curp": user.curp,
            "telefono": user.telefono,
            # "email": user.email,
            # "password": user.password,
            "cp": user.direccion.cp,
            "ciudad": user.direccion.ciudad,
            "colonia": user.direccion.colonia,
            "direccion": user.direccion.direccion
        }
        return jsonify(userr), HTTPStatus.OK

    # @jwt_required()
    def post(self):
        body = request.get_json()
        email = body['email']

        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            return jsonify({'error' : 'Email invalido'})

        direccion = DireccionModel(
            cp = body['dir']['cp'],
            ciudad = body['dir']['ciudad'],
            colonia = body['dir']['colonia'],
            direccion = body['dir']['direccion']
        )

        user = UserModel(
            direccion = direccion,
            nombre = body['nombre'],
            apellidos = body['apellidos'],
            curp = body['curp'],
            telefono = body['telefono'],
            rol = body['rol'],
            email = body['email'],
            password = body['password'],

        )
        user.save()
        return jsonify(user), HTTPStatus.CREATED

    # @jwt_required()
    def put(self, id):
        body = request.get_json()
        user = UserModel.objects(id=id).first()
        user.update(**body)

        return jsonify(user), HTTPStatus.OK

    @jwt_required()
    def delete(self):
        id = get_jwt_identity()
        user = UserModel.objects(id=id).first()
        user.delete()
        return jsonify(str(user.id))