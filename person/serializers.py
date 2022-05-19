from rest_framework.serializers import ModelSerializer
from person.models import Person, PersonConfig


class PersonConfigSerializer(ModelSerializer):
    """
    PersonConfig ModelSerializer
    """
    class Meta:
        ref_name = 'PersonConfig'
        model = PersonConfig
        fields = ('mode', 'lang')


class PersonPhotoSerializer(ModelSerializer):
    class Meta:
        model = Person
        fields = ['photo']
