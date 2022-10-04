from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.fields import ReadOnlyField, DateField, IntegerField
from rest_framework.serializers import ModelSerializer, Serializer, SerializerMethodField

from dwelling.exceptions import DwellingWithoutWaterMeterError
from comment.models import Comment
from dwelling.exceptions import UserManagerRequiredError
from dwelling.models import DwellingComment, Dwelling
from geolocation.serializers import GeolocationSerializer
from manager.exceptions import ManagerLimitExceeded
from manager.models import Manager
from watermeter.serializers import WaterMeterSerializer


class DwellingResumeSerializer(Serializer):
    """
    Dwelling Resume ModelSerializer
    """
    total_dwellings = ReadOnlyField()
    total_residents = ReadOnlyField()
    total_owners = ReadOnlyField()

    class Meta:
        ref_name = 'DwellingResume'


class DwellingSerializer(ModelSerializer):
    """
    Dwelling ModelSerializer
    """
    id = ReadOnlyField()
    release_date = ReadOnlyField()
    discharge_date = ReadOnlyField()
    geolocation = GeolocationSerializer(many=False, read_only=False)

    class Meta:
        ref_name = 'Dwelling'
        model = Dwelling
        fields = (
            'id',
            'geolocation',
            'release_date',
            'discharge_date',
        )


class DwellingCreateSerializer(ModelSerializer):
    """
    Dwelling Create ModelSerializer
    """
    id = ReadOnlyField()
    geolocation = GeolocationSerializer(many=False, read_only=False)
    water_meter = WaterMeterSerializer(
        required=False,
        many=False,
        read_only=False,
        write_only=True,
    )

    class Meta:
        ref_name = 'DwellingCreate'
        model = Dwelling
        fields = (
            'id',
            'geolocation',
            'water_meter',
        )

    def create(self, validated_data):
        user: User = self.context.get("request").user
        try:
            manager: Manager = Manager.objects.get(user_id=user.id)
        except ObjectDoesNotExist:
            raise UserManagerRequiredError()

        if manager.has_exceeded_limit():
            raise ManagerLimitExceeded()

        # Create geolocation
        new_geolocation = GeolocationSerializer(
            data=validated_data.pop('geolocation')).self_create()
        water_meter_exist = False
        if 'water_meter' in validated_data:
            # Extract water_meter_code
            water_meter_code: WaterMeterSerializer = validated_data.pop(
                'water_meter')['code']
            water_meter_exist = True
        # Create dwelling
        dwelling: Dwelling = Dwelling.objects.create(
            manager=manager, geolocation=new_geolocation, **validated_data)
        if water_meter_exist:
            # Create water meter
            dwelling.change_current_water_meter(water_meter_code)

        return dwelling


class DwellingDetailSerializer(ModelSerializer):
    """
    Dwelling Detail ModelSerializer
    """
    id = ReadOnlyField()
    city = SerializerMethodField()
    road = SerializerMethodField()
    number = SerializerMethodField()
    resident_full_name = SerializerMethodField()
    resident_phone = SerializerMethodField()
    water_meter_code = SerializerMethodField()
    watermeter_last_month_consumption = SerializerMethodField()
    latitude = SerializerMethodField()
    longitude = SerializerMethodField()

    class Meta:
        ref_name = 'DwellingDetail'
        model = Dwelling
        fields = ('id', 'city', 'road', 'number', 'resident_full_name',
                  'resident_phone', 'water_meter_code',
                  'watermeter_last_month_consumption', 'latitude', 'longitude')

    @staticmethod
    def __get_dwelling_obj(obj) -> Dwelling:
        # the serializer can return model or dict
        if type(obj) is dict:
            return Dwelling.objects.get(id=obj.get('id'))
        elif type(obj) is Dwelling:
            return obj

    def get_city(self, obj):
        dwelling: Dwelling = self.__get_dwelling_obj(obj)
        return dwelling.geolocation.address.city

    def get_road(self, obj):
        dwelling: Dwelling = self.__get_dwelling_obj(obj)
        return dwelling.geolocation.address.road

    def get_number(self, obj):
        dwelling: Dwelling = self.__get_dwelling_obj(obj)
        return dwelling.geolocation.number

    def get_resident_full_name(self, obj):
        dwelling: Dwelling = self.__get_dwelling_obj(obj)
        resident = dwelling.get_current_resident()
        return resident.user.get_full_name() if resident else ''

    def get_resident_phone(self, obj):
        from user.models import UserPhone
        dwelling: Dwelling = self.__get_dwelling_obj(obj)
        resident = dwelling.get_current_resident()
        user_phone_number = ''
        if resident:
            try:
                user_phone: UserPhone = UserPhone.objects.get(
                    user=resident.user, main=True)
                if user_phone:
                    user_phone_number = user_phone.phone.phone_number
            except ObjectDoesNotExist:
                pass
        return user_phone_number

    def get_water_meter_code(self, obj):
        dwelling: Dwelling = self.__get_dwelling_obj(obj)
        water_meter = dwelling.get_current_water_meter()
        if not water_meter:
            return ''
        return water_meter.code

    def get_watermeter_last_month_consumption(self, obj):
        dwelling: Dwelling = self.__get_dwelling_obj(obj)
        try:
            return dwelling.get_last_month_consumption()
        except DwellingWithoutWaterMeterError:
            return ''

    def get_latitude(self, obj):
        dwelling: Dwelling = self.__get_dwelling_obj(obj)
        return dwelling.geolocation.latitude

    def get_longitude(self, obj):
        dwelling: Dwelling = self.__get_dwelling_obj(obj)
        return dwelling.geolocation.longitude


class DwellingWaterMeterMonthConsumptionSerializer(Serializer):
    """
    Dwelling Month Water Consumption Serializer
    """
    id = IntegerField()
    date = DateField()
    month_consumption = IntegerField()
    max_month_consumption = IntegerField()
    month_consumption_percentage = IntegerField()

    class Meta:
        ref_name = 'DwellingWaterMonthConsumption'


class DwellingCommentCreateSerializer(ModelSerializer):
    dwelling_id = IntegerField()

    class Meta:
        model = Comment
        fields = ('dwelling_id', 'message')

    def to_representation(self, obj):
        return {
            'dwelling_id':
            DwellingComment.objects.get(comment=obj.id).dwelling.id,
            'message': obj.message,
        }

    def create(self, validated_data):
        dwelling = Dwelling.objects.get(id=validated_data.pop('dwelling_id'))
        message = validated_data.pop('message')
        return dwelling.add_comment(message)
