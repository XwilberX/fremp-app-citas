from project import db
from datetime import datetime

class DireccionModel(db.EmbeddedDocument):
    cp = db.StringField()
    ciudad = db.StringField()
    colonia = db.StringField()
    direccion = db.StringField()

class UserModel(db.Document):
    nombre = db.StringField()
    apellidos = db.StringField()
    curp = db.StringField()
    telefono = db.StringField()
    rol = db.IntField()
    email = db.StringField(unique=True)
    password = db.StringField()
    fechaCreacion = db.DateTimeField(default=datetime.utcnow)
    direccion = db.EmbeddedDocumentField(DireccionModel)
