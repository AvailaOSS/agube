from rest_framework.serializers import ModelSerializer, ImageField
from person.models import Person, PersonConfig

from drf_yasg import openapi


class PersonConfigSerializer(ModelSerializer):
    """
    PersonConfig ModelSerializer
    """

    class Meta:
        ref_name = 'PersonConfig'
        model = PersonConfig
        fields = ('mode', 'lang')


class PersonPhotoFieldSerializer(ImageField):

    class Meta:
        swagger_schema_fields = {
            "type": openapi.TYPE_OBJECT,
            "title": "PersonPhoto",
            "properties": {
                "photo":
                openapi.Schema(description="Image file",
                               type=openapi.TYPE_STRING,
                               format=openapi.FORMAT_BINARY),
            },
            "required": ["photo"]
        }


class PersonPhotoSerializer(ModelSerializer):
    photo = PersonPhotoFieldSerializer()

    class Meta:
        ref_name = 'PersonPhoto'
        model = Person
        fields = ['photo']

    def save(self, *args, **kwargs):
        if self.instance.photo:
            self.instance.photo.delete()
        return super().save(*args, **kwargs)
