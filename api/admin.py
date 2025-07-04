from django.contrib import admin
from .models import Country, Characteristic, FootballClub, League, Appointments
from import_export.admin import ImportExportModelAdmin
from import_export import resources
# Register your models here.



class CountryResource(resources.ModelResource):

    class Meta:
        model = Country
        fields = ('id', 'name')

class CharacteristicResource(resources.ModelResource):

    class Meta:
        model = Characteristic
        fields = ('id', 'name')

class LeagueResource(resources.ModelResource):

    class Meta:
        model = League
        fields = ('id', 'name')


class CountryAdmin(ImportExportModelAdmin):
     resource_classes = [CountryResource]


class CharacteristicAdmin(ImportExportModelAdmin):
     resource_classes = [CharacteristicResource]

class LeagueAdmin(ImportExportModelAdmin):
     resource_classes = [LeagueResource]

class FootballClubAdmin(admin.ModelAdmin):
     filter_horizontal = ('characteristic',)


admin.site.register(Country, CountryAdmin)
admin.site.register(Characteristic, CharacteristicAdmin)
admin.site.register(FootballClub, FootballClubAdmin)
admin.site.register(League, LeagueAdmin)
admin.site.register(Appointments)



admin.site.site_header = "Equipos - Administración"
admin.site.site_title = "Equipos - Administración"