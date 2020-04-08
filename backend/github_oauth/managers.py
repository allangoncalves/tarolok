from django.contrib.auth.models import BaseUserManager


class UserManager(BaseUserManager):

    def create_user(self, token, password=None, **kwargs):
        user = self.model(token=token, **kwargs)
        password = self.make_random_password(10)
        user.set_password(password)
        user.save(using=self._db)
        return user
