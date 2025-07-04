from rest_framework import serializers
from .models import League, Country, Characteristic, FootballClub, Appointments

class CountrySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Country
        fields = ('id', 'name', 'created', 'modified')


class LeagueSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = League
        fields = ('id', 'name', 'created', 'modified')


class CharacteristicSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Characteristic
        fields = ('id', 'name', 'created', 'modified')


class FootballClubSerializer(serializers.ModelSerializer):
    leagueDetails = LeagueSerializer(source='league', read_only=True)
    countryDetails = CountrySerializer(source='country', read_only=True)
    characteristicsNames = serializers.SerializerMethodField()
    
    class Meta:
        model = FootballClub
        fields = '__all__'

    def get_characteristicsNames(self, obj):
        return [char.name for char in obj.characteristic.all()]
    
class FootballClubChartSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='country')
    label = serializers.CharField(source='country__name')
    value = serializers.IntegerField(source='attendance')

    class Meta:
        model = FootballClub
        fields = ('id', 'label', 'value')

class AttendanceFootballClubChartSerializer(serializers.ModelSerializer):
    label = serializers.CharField(source='name')
    value = serializers.IntegerField(source='attendance')

    class Meta:
        model = FootballClub
        fields = ('label', 'value')

class BarFootballClubChartSerializer(serializers.ModelSerializer):
    characteristic__name = serializers.CharField()
    attendance1 = serializers.IntegerField()
    attendance2 = serializers.IntegerField()
    attendance3 = serializers.IntegerField()

    class Meta:
        model = FootballClub
        fields = ('characteristic__name', 'attendance1', 'attendance2', 'attendance3')

class AppointmentSerializer(serializers.ModelSerializer):
    title = serializers.CharField(source='name')
    start = serializers.DateField(source='startDate')
    # end = serializers.DateField(source='endDate')
    # end = serializers.DateField(source='endDate', format="%Y-%m-%dT%H:%M:%S")
    end = serializers.DateField(source='endDate', format="%Y-%m-%d 23:59:59")
    classNames = serializers.CharField(source='status')

    class Meta:
        model = Appointments
        fields = ('id', 'start', 'classNames', 'end', 'title')
    
