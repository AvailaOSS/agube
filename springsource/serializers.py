from django.contrib.auth.models import User
from rest_framework.fields import IntegerField, ReadOnlyField, SerializerMethodField
from rest_framework.serializers import ModelSerializer

from comment.models import Comment
from geolocation.serializers import GeolocationSerializer
from manager.models import Manager
from springsource.models import SpringSource, SpringSourceComment


class SpringSourceResumeSerializer(ModelSerializer):
    """
    SpringSource Resume Model Serializer
    """
    total_spring_sources = IntegerField()

    class Meta:
        ref_name = 'SpringSourceResume'
        model = Manager
        fields = ('total_spring_sources',)

    def to_representation(self, instance: Manager):
        total = SpringSource.objects.filter(manager=instance, discharge_date__isnull=True).count()
        representation = {'total_spring_sources': total}
        return representation


class SpringSourceSerializer(ModelSerializer):
    """
    SpringSource Model Serializer
    """
    geolocation = GeolocationSerializer(many=False, read_only=False)

    class Meta:
        ref_name = 'SpringSource'
        model = SpringSource
        fields = ('id', 'geolocation', 'release_date', 'discharge_date',)
        read_only_fields = ['id', 'release_date', 'discharge_date', ]

    def create(self, validated_data):
        # Create geolocation
        new_geolocation = GeolocationSerializer(
            data=validated_data.pop('geolocation')).self_create()

        # Extract the manager from the request
        user: User = self.context.get("request").user
        manager = Manager.objects.get(user=user)

        # Create spring_source
        return SpringSource.objects.create(manager=manager, geolocation=new_geolocation)


class SpringSourceDetailSerializer(ModelSerializer):
    """
    Dwelling Detail ModelSerializer
    """
    id = ReadOnlyField()
    city = SerializerMethodField()
    road = SerializerMethodField()
    number = SerializerMethodField()
    latitude = SerializerMethodField()
    longitude = SerializerMethodField()

    class Meta:
        ref_name = 'SpringSourceDetail'
        model = SpringSource
        fields = ('id', 'city', 'road', 'number', 'latitude', 'longitude',)

    @staticmethod
    def __get_spring_source_obj(obj) -> SpringSource:
        # the serializer can return model or dict
        if type(obj) is dict:
            return SpringSource.objects.get(id=obj.get('id'))
        elif type(obj) is SpringSource:
            return obj

    def get_city(self, obj):
        return self.__get_spring_source_obj(obj).geolocation.address.city

    def get_road(self, obj):
        return self.__get_spring_source_obj(obj).geolocation.address.road

    def get_number(self, obj):
        return self.__get_spring_source_obj(obj).geolocation.number

    def get_latitude(self, obj):
        return self.__get_spring_source_obj(obj).geolocation.latitude

    def get_longitude(self, obj):
        return self.__get_spring_source_obj(obj).geolocation.longitude


class SpringSourceCommentCreateSerializer(ModelSerializer):
    spring_source_id = IntegerField()

    class Meta:
        ref_name = 'SpringSourceCommentCreate'
        model = Comment
        fields = ('spring_source_id', 'message')

    def to_representation(self, obj):
        return {
            'spring_source_id':
                SpringSourceComment.objects.get(comment=obj.id).spring_source.id,
            'message': obj.message,
        }

    def create(self, validated_data):
        spring_source = SpringSource.objects.get(id=validated_data.pop('spring_source_id'))
        message = validated_data.pop('message')
        return spring_source.add_comment(message)
