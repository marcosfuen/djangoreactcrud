from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from .serializers import CountrySerializer, LeagueSerializer, CharacteristicSerializer, FootballClubSerializer, FootballClubChartSerializer,\
                         AttendanceFootballClubChartSerializer, BarFootballClubChartSerializer, AppointmentSerializer
from .models import Country, League, Characteristic, FootballClub, Appointments
import codecs
import csv
from django.db.models import Sum, Count, F, Value, FloatField, IntegerField, Case, When
# Create your views here or views-set.


class CountryViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Country.objects.all()
    serializer_class = CountrySerializer

    @action(detail=False, methods=["GET"])    
    def listAll(self, request):
        queryset = Country.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
    def list(self, request):
        queryset = Country.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)
        
    @action(detail=False, methods=["POST"])    
    def uploadData(self, request):

        file = request.FILES.get("file")
        reader = csv.DictReader(codecs.iterdecode(file, "utf-8"), delimiter=",")
        data=list(reader)
        serializer = self.serializer_class(data=data, many=True)
        serializer.is_valid(raise_exception=True)
        
        countryList = []
        
        for row in serializer.data:
            countryList.append(
                Country(
                    name = row['name'] 
                )
            )
        Country.objects.bulk_create(countryList)

        return Response("Successfully uploade the data!")


class LeagueViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = League.objects.all()
    serializer_class = LeagueSerializer
  
    def list(self, request):
        queryset = League.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=["GET"])    
    def listAll(self, request):
        queryset = League.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)
    
    @action(detail=False, methods=["POST"])    
    def uploadData(self, request):

        file = request.FILES.get("file")
        reader = csv.DictReader(codecs.iterdecode(file, "utf-8"), delimiter=",")
        data=list(reader)
        serializer = self.serializer_class(data=data, many=True)
        serializer.is_valid(raise_exception=True)
        
        leagueList = []
        
        for row in serializer.data:
            leagueList.append(
                League(
                    name = row['name'] 
                )
            )
        League.objects.bulk_create(leagueList)

        return Response("Successfully uploade the data!")
    

class CharacteristicViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Characteristic.objects.all()
    serializer_class = CharacteristicSerializer

    @action(detail=False, methods=["GET"])    
    def listAll(self, request):
        queryset = Characteristic.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)    

    def list(self, request):
        queryset = Characteristic.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)
        
    @action(detail=False, methods=["POST"])    
    def uploadData(self, request):

        file = request.FILES.get("file")
        reader = csv.DictReader(codecs.iterdecode(file, "utf-8"), delimiter=",")
        data=list(reader)
        serializer = self.serializer_class(data=data, many=True)
        serializer.is_valid(raise_exception=True)
        
        characteristicList = []
        
        for row in serializer.data:
            characteristicList.append(
                Characteristic(
                    name = row['name'] 
                )
            )
        Characteristic.objects.bulk_create(characteristicList)

        return Response("Successfully uploade the data!")
    

class FootballClubViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = FootballClub.objects.all()
    serializer_class = FootballClubSerializer

    def list(self, request):
        queryset = FootballClub.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)
    
    def retrieve(self, request, pk=None):
        queryset = self.queryset.get(pk=pk)
        serializer = self.serializer_class(queryset)
        return Response(serializer.data)
    
    def update(self, request, pk=None):
        queryset = self.queryset.get(pk=pk)
        serializer = self.serializer_class(queryset, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)
        
    def destroy(self, request, pk=None):
        queryset = self.queryset.get(pk=pk)
        queryset.delete()
        return Response(status=204)
    
    def list_Football_Club_By_Country(self, request):
        
        queryset = FootballClub.objects.values('id', 'country__name').annotate(attendance=Sum('attendance'))
        
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

class FootballClubChartViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = FootballClub.objects.all()
    serializer_class = FootballClubChartSerializer

    def list(self, request):
        queryset = FootballClub.objects.values('country', 'country__name').annotate(attendance=Sum('attendance'))
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
class AttendanceFootballClubChartViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = FootballClub.objects.all()
    serializer_class = AttendanceFootballClubChartSerializer

    def list(self, request):
        queryset = FootballClub.objects.values('name', 'attendance')
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
class BarFootballClubChartViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = FootballClub.objects.all()
    serializer_class = BarFootballClubChartSerializer

    def list(self, request):
                
        queryset = FootballClub.objects.values('characteristic__name')\
                .annotate(attendance1=Count(
                    Case(
                        When(name='coutry__name', then='attendance'),
                        default=0,
                        output_field=IntegerField()
                    )
                ))\
                .annotate(attendance2=Count(
                    Case(
                        When(name='coutry__name', then='attendance'),
                        default=0,
                        output_field=IntegerField()
                    )
                ))\
                .annotate(attendance3=Count(
                    Case(
                        When(name='coutry__name', then='attendance'),
                        default=0,
                        output_field=IntegerField()
                    )
                ))
        # for lolo in FootballClub.objects.all().select_related('country'):
        #     print(lolo.country)
        # for lolo in FootballClub.objects.values('characteristic__name').annotate(footBallClup=Count('name')).values('characteristic__name', 'name', 'attendance'):
        #     print(lolo)
        # test = FootballClub.objects.values('characteristic__name').annotate(dcount=Count('name'))
        # test = FootballClub.objects.values('characteristic__name').annotate(footBallClup=Count('name')).values('characteristic__name', 'name', 'attendance')
        # print(test)
        # queryset = FootballClub.objects.values('name', 'attendance', 'characteristic__name').annotate(cantidad=Count('characteristic__name'))
        # queryset = FootballClub.objects.annotate(characteristic__name=Count('characteristic__name')).values('name', 'attendance', 'characteristic__name')
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class AppointmentViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Appointments.objects.all()
    serializer_class = AppointmentSerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def list(self, request):
        queryset = Appointments.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        queryset = self.queryset.get(pk=pk)
        serializer = self.serializer_class(queryset)
        return Response(serializer.data)