from project import db
from datetime import datetime

from project.models.user import UserModel
from project.models.conyuge import ConyugeModel

class CitaModel(db.Document):
    esposo = db.ReferenceField(UserModel)
    conyuge = db.ReferenceField(ConyugeModel)
    fechaCreacion = db.DateTimeField(default=datetime.utcnow)
    fechacita = db.DateTimeField()