from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404, render, redirect
from django.views import generic, View
from django.conf import settings

# Create your views here.


class IndexView(View):
    template_name = 'exampleapp/index.html'

    def get(self, request):
        if request.user.is_anonymous:
            if(request.GET.get('login')):
                return redirect(f'https://github.com/login/oauth/authorize?client_id={settings.GITHUB_CLIENT_ID}&redirect_uri={settings.GITHUB_REDIRECT_URI}&scope={settings.GITHUB_SCOPES}')
            return render(request, self.template_name)
        else:
            props = {
                'login': request.user.login
            }
            return render(request, self.template_name, {'props': props})

