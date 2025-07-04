from django.test import SimpleTestCase, TestCase, Client
from django.urls import reverse

# Create your tests here.


class HomePageTests(SimpleTestCase):

    def test_url_exists_at_correct_location(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)

# class AdminPageTests(SimpleTestCase):

#     def test_url_exists_at_correct_location(self):
#         response = self.client.get("http://localhost:8000/admin/")
#         self.assertEqual(response.status_code, 200)
    
#     def test_url_available_by_name(self):
#         response = self.client.get(reverse("admin"))
#         self.assertEqual(response.status_code, 200)

# class CountrypageTests(SimpleTestCase):

#     def test_url_exists_at_correct_location(self):
#         response = self.client.get("http://localhost:8000/")
#         self.assertEqual(response.status_code, 200)


# class MyViewTest(TestCase):
#        def setUp(self):
#            self.client = Client()

#        def test_my_get_endpoint(self):
#            url = reverse('my_endpoint_name')  # Replace 'my_endpoint_name'
#            response = self.client.get(url)
#            self.assertEqual(response.status_code, 200) # Check for 200 OK
#            # Add more assertions to check response content