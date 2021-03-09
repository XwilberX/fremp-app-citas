from project import db
from datetime import datetime

from project.models.user import UserModel

class DireccionModel(db.EmbeddedDocument):
    cp = db.StringField()
    ciudad = db.StringField()
    colonia = db.StringField()
    direccion = db.StringField()

class ConyugeModel(db.Document):
    esposo = db.ReferenceField(UserModel)
    nombre = db.StringField()
    apellidos = db.StringField()
    curp = db.StringField()
    telefono = db.StringField()
    email = db.StringField(unique=True)
    fechaCreacion = db.DateTimeField(default=datetime.utcnow)
    direccion = db.EmbeddedDocumentField(DireccionModel)