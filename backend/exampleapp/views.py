from django.http import HttpResponseRedirect, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth import authenticate
from django.urls import reverse
from django.utils import timezone
from django.views import generic
from django.conf import settings
from .models import Choice, Question
import requests

# Create your views here.


class IndexView(generic.ListView):
    template_name = 'exampleapp/index.html'
    context_object_name = 'latest_question_list'

    def get_queryset(self):
        """
        Return the last five published questions (not including those set to be
        published in the future).
        """
        return Question.objects.filter(
            pub_date__lte=timezone.now()
        ).order_by('-pub_date')[:5]


class DetailView(generic.DetailView):
    model = Question
    template_name = 'exampleapp/detail.html'

    def get_queryset(self):
        """
        Excludes any questions that aren't published yet.
        """
        return Question.objects.filter(pub_date__lte=timezone.now())


class ResultsView(generic.DetailView):
    model = Question
    template_name = 'exampleapp/results.html'


@csrf_exempt
def hello(request):
    return redirect(f'https://github.com/login/oauth/authorize?client_id={settings.GITHUB_CLIENT_ID}&redirect_uri={settings.GITHUB_REDIRECT_URI}&scope={settings.GITHUB_SCOPES}')
    # return HttpResponse('pong')


@csrf_exempt
def github_hooks(request):
    print(request)
    print(request.body)
    return HttpResponse("pong")


@csrf_exempt
def test(request):
    if(request.GET.get('login')):
        return redirect(f'https://github.com/login/oauth/authorize?client_id={settings.GITHUB_CLIENT_ID}&redirect_uri={settings.GITHUB_REDIRECT_URI}&scope={settings.GITHUB_SCOPES}')
    return render(request, 'exampleapp/login.html', {'value': 'Button clicked'})


def github_callback(request):
    code = request.GET.get('code')
    user = authenticate(code=code)
    if user is not None:
        return redirect("/exampleapp/")
    return redirect("/exampleapp/test")


def vote(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    try:
        selected_choice = question.choice_set.get(pk=request.POST['choice'])
    except (KeyError, Choice.DoesNotExist):
        # Redisplay the question voting form.
        return render(request, 'exampleapp/detail.html', {
            'question': question,
            'error_message': "You didn't select a choice.",
        })
    else:
        selected_choice.votes += 1
        selected_choice.save()
        # Always return an HttpResponseRedirect after successfully dealing
        # with POST data. This prevents data from being posted twice if a
        # user hits the Back button.
        return HttpResponseRedirect(reverse('exampleapp:results', args=(question.id,)))
