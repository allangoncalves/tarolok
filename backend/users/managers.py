from django.contrib.auth.models import BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **kwargs):
        email = self.normalize_email(email)
        user = self.model(email=email, **kwargs)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, **kwargs):
        user = self.create_user(**kwargs)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class GithubUserManager(BaseUserManager):

    def create_user(self, login, password=None, **kwargs):
        user = self.model(login=login, **kwargs)
        password = self.make_random_password(10)
        user.set_password(password)
        user.save(using=self._db)
        return user
