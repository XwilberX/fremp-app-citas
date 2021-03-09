from project import db
from datetime import datetime

class InvalidToken(db.Document):
    jti = db.StringField(unique=True)
    create_at = db.DateTimeField(default=datetime.utcnow)

    @classmethod
    def is_invalid(cls, jti):
        q = cls.objects(jti=jti).first()

        return bool(q)