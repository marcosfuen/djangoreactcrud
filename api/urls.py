from django.urls import path
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib.auth import views as auth_views
from django.conf import settings
from django.conf.urls.static import static
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('country', CountryViewSet, basename='country')
router.register('league', LeagueViewSet, basename='league')
router.register('characteristic', CharacteristicViewSet, basename='characteristic')
router.register('footballClub', FootballClubViewSet, basename='footballClub')
router.register('footballClubChart', FootballClubChartViewSet, basename='footballClubChart')
router.register('attendanceFootballClubChart', AttendanceFootballClubChartViewSet, basename='attendanceFootballClubChart')
router.register('barFootballClubChart', BarFootballClubChartViewSet, basename='barFootballClubChart')
router.register('appointments', AppointmentViewSet, basename='appointments')

urlpatterns = router.urls

# urlpatterns = [
#     path('', LoginView.as_view(), name='login'),
#     path('login/', LoginView.as_view(), name='login'),
#     path('logout/', auth_views.LogoutView.as_view(next_page='/login/'), name='logout'),
#     path('accounts/profile/', profile, name='profile'),
#     path('accounts/profile/testrapido_positivo', usuariosPosotivoTestRapido, name='testrapido'),
#     path('accounts/profile/kit_positivo', usuariosPosotivoKit, name='kit'),
#     path('accounts/profile/pcr_positivo', usuariosPosotivoPCR, name='pcr'), 
#     path('accounts/profile/buscar_por_test/', buscarPorTest, name='buscarPorTest'),
#     path('accounts/profile/todos_positivos/', todosUsuariosPosotivo, name='todos_positivos'),
#     path('accounts/profile/suma_positivos/', usuariosPosotivoSUMA, name='suma_positivos'),
#     path('accounts/profile/area_salud_positivos/', usuariosPosotivoAreaSalud, name='area_salud_positivos'),
# ]


# if settings.DEBUG:
#     urlpatterns += static(settings.MEDIA_URL,
#                           document_root=settings.MEDIA_ROOT)