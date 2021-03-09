from http import  HTTPStatus
import re
from flask_classful import FlaskView, route
from flask import jsonify, request
from flask_jwt_extended import (jwt_required, create_access_token,
                                create_refresh_token, get_jwt_identity, get_jwt)

from project.models.jwt import InvalidToken
from project.models.user import UserModel
from project.models.conyuge import ConyugeModel
from project.models.cita import CitaModel


class TokenView(FlaskView):
    route_base = '/jwt'
    default_methods = ['POST']

    def login(self):
        try:
            data = request.get_json()
            email = data['email']
            password = data['password']
            conyuge = False

            if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
                return jsonify({'error': 'Email invalido'})

            user = UserModel.objects(email=email).first()

            if user and email == user.email and password == user.password:
                token = create_access_token(identity=str(user.id))
                refresh_token = create_refresh_token(identity=str(user.id))

                if ConyugeModel.objects(esposo=user.id).first() and CitaModel.objects(esposo=user.id).first():
                    conyuge = True

                return jsonify({
                    "id" : str(user.id),
                    "nombre" : str(user.nombre).title(),
                    "rol" : user.rol,
                    "conyuge" : conyuge,
                    "token" : token,
                    "refresh_token" : refresh_token
                }), HTTPStatus.OK

            return jsonify({'error': 'El usuario no exite'}), HTTPStatus.OK

        except Exception as e:
            print(e)
            return jsonify({
                'error' : 'Invalid form'
            }), HTTPStatus.BAD_REQUEST

    @jwt_required(refresh=True)
    def refresh(self):
        identity = get_jwt_identity()

        token = create_access_token(identity=identity)
        return jsonify({
            'id' : identity,
            'token' : token
        })

    @jwt_required()
    def access_exit(self):
        jti = get_jwt()["jti"]

        try:
            invalid_token = InvalidToken(jti=jti)
            invalid_token.save()
            return jsonify({"success": True})
        except Exception as e:
            print(e)
            return {"error": e.message}

    @jwt_required()
    def refresh_exit(self):
        jti = get_jwt()["jti"]

        try:
            invalid_token = InvalidToken(jti=jti)
            invalid_token.save()
            return jsonify({"success": True})
        except Exception as e:
            print(e)
            return {"error": e.message}

    @jwt_required()
    def checkiftokenexpire(self):
        return jsonify({"success": True})