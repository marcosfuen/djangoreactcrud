from django.db import models

# Create your models here.
class Country(models.Model):
    '''Model definition for ModelName.'''
    name = models.CharField(unique=True, max_length = 150)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateField(auto_now=True)
      

    class Meta:
        '''Meta definition for ModelName.'''

        verbose_name = 'Country'
        verbose_name_plural = 'Countrys'

    def __str__(self):
        return self.name
    

class League(models.Model):
    '''Model definition for ModelName.'''
    name = models.CharField(unique=True, max_length = 150)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateField(auto_now=True)
      

    class Meta:
        '''Meta definition for ModelName.'''

        verbose_name = 'League'
        verbose_name_plural = 'Leagues'

    def __str__(self):
        return self.name
    

class Characteristic(models.Model):
    '''Model definition for ModelName.'''
    name = models.CharField(unique=True, max_length = 150)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateField(auto_now=True)
      

    class Meta:
        '''Meta definition for ModelName.'''

        verbose_name = 'Characteristic'
        verbose_name_plural = 'Characteristics'

    def __str__(self):
        return self.name
    

class FootballClub(models.Model):
    '''Model definition for ModelName.'''
    name = models.CharField(unique=True, max_length = 150)
    description = models.TextField(max_length = 1000)
    attendance = models.IntegerField(null = True)
    city = models.CharField(max_length = 150)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    league = models.ForeignKey(League, on_delete=models.CASCADE)
    characteristic = models.ManyToManyField(Characteristic)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateField(auto_now=True)
      

    class Meta:
        '''Meta definition for ModelName.'''

        verbose_name = 'FootballClub'
        verbose_name_plural = 'FootballClubs'

    def __str__(self):
        return self.name
    
class Appointments(models.Model):
    '''Model definition for Appointments.'''
    name = models.CharField(max_length=200)
    startDate = models.DateField()
    endDate = models.DateField()
    comments = models.CharField(max_length=1000, blank=True, null=True)
    status = models.CharField(max_length=200)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        '''Meta definition for Appointments.'''

        verbose_name = 'Appointments'
        verbose_name_plural = 'Appointments'

    def __str__(self):
        return self.name